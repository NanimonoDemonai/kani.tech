import { Bucket } from "../../../constants/s3Bucket";
import { Resolvers } from "../../../types/generated/graphqlCodeGen";
import { sourceParser } from "../../../utils/parsers/sourceParser";
import { prisma } from "../client/PrismClient";
import { s3 } from "../client/S3";
import { SessionContextType } from "./context";
import { getUploadUrlResolver } from "./getUploadUrlResolver";
import { postArticleResolver } from "./postArticleResolver";

export class AuthenticationError extends Error {}

export const isUser = (context: SessionContextType): void => {
  if (context.session?.role !== "USER") {
    throw new AuthenticationError("permission denied");
  }
};

export const rootResolvers: Resolvers = {
  Mutation: {
    postArticle: postArticleResolver,
    deleteObject: async (parent, { key }, context) => {
      isUser(context);
      await s3.deleteObject({ Bucket, Key: key }).promise();
      await prisma.imageObject.delete({
        where: {
          key,
        },
      });
      return { id: key };
    },
    updateObjectStatus: async (parent, { key, isError }, context) => {
      isUser(context);
      if (isError) {
        await prisma.imageObject.update({
          where: { key },
          data: {
            verified: "ERROR",
          },
        });
        return { id: key };
      }
      const head = await s3.headObject({ Bucket, Key: key }).promise();
      if (head)
        await prisma.imageObject.update({
          where: {
            key,
          },
          data: {
            verified: head ? "VERIFIED" : "ERROR",
          },
        });
      return { id: key };
    },
  },
  Query: {
    healthCheck: () => "hello",
    getUploadUrl: getUploadUrlResolver,
    getObjectList: async (parent, { keyPrefix }, context) => {
      isUser(context);

      const objects = await prisma.objectDirectory.findUnique({
        where: { keyPrefix },
        include: {
          imageObjects: true,
        },
      });
      if (!objects) throw new AuthenticationError("permission denied");

      return objects.imageObjects.map((e) => ({
        ...e,
        modified: e.updatedAt.toJSON(),
      }));
    },
    getPreview: async (parent, { source }, context) => {
      isUser(context);
      const { images, code } = await sourceParser(source);
      const usedImages = await prisma.imageObject.findMany({
        where: { key: { in: images } },
      });

      return {
        code,
        images: usedImages.map((e) => ({
          ...e,
          modified: e.updatedAt.toJSON(),
        })),
      };
    },
  },
};
