import { Bucket } from "../../../constants/NextPublicEnvs";
import { Resolvers } from "../../../types/generated/graphqlCodeGen";
import { sourceParser } from "../../../utils/parsers/sourceParser";
import { prisma } from "../client/PrismClient";
import { s3 } from "../client/S3";
import { SessionContextType } from "./context";
import { getObjectListResolver } from "./getObjectListResolver";
import { getUploadUrlResolver } from "./getUploadUrlResolver";
import { postArticleResolver } from "./postArticleResolver";
import { updateObjectStatusResolver } from "./updateObjectStatusResolver";

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
    updateObjectStatus: updateObjectStatusResolver,
  },
  Query: {
    healthCheck: () => "hello",
    getUploadUrl: getUploadUrlResolver,
    getObjectList: getObjectListResolver,
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
