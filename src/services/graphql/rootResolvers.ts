import { Bucket } from "../../constants/s3Bucket";
import { Resolvers } from "../../types/generated/graphqlCodeGen";
import { frontMatterStringify } from "../../utils/parsers/FrontMatterParser";
import { prisma } from "../client/PrismClient";
import { s3 } from "../client/S3";
import { createOrUpsertEntry } from "../createOrUpsertEntry";
import { SessionContextType } from "./context";

export class AuthenticationError extends Error {}

const isUser = (context: SessionContextType): void => {
  if (context.session?.role !== "USER") {
    throw new AuthenticationError("permission denied");
  }
};

export const rootResolvers: Resolvers = {
  Mutation: {
    postArticle: async (
      parent,
      { input: { tags, source, pageName, pageTitle } },
      context
    ) => {
      isUser(context);
      const data =
        frontMatterStringify(source, {
          title: pageTitle,
          tags,
          disableSanitize: false,
        }) || "";
      await createOrUpsertEntry({ tags, source: data, pageName, pageTitle });
      return { id: "1" };
    },
    deleteObject: async (parent, { key: Key }, context) => {
      isUser(context);
      await s3.deleteObject({ Bucket, Key }).promise();
      return { id: "1" };
    },
  },
  Query: {
    healthCheck: () => "hello",
    getUploadUrl: async (
      parent,
      { input: { keyPrefix, contentType, size, width, height, keySuffix } },
      context
    ) => {
      isUser(context);

      const key = `${keyPrefix}/${keySuffix}`;
      const res = await s3.getSignedUrlPromise("putObject", {
        Bucket,
        Key: key,
        ContentType: contentType,
        Expires: 30,
      });
      if (!res) throw new AuthenticationError("permission denied");

      const imageObjects = {
        create: {
          key,
          contentType,
          width,
          height,
          size,
        },
      };
      await prisma.objectDirectory.upsert({
        where: {
          keyPrefix,
        },
        create: {
          keyPrefix,
          imageObjects,
        },
        update: {
          imageObjects,
        },
      });
      return res;
    },

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
  },
};
