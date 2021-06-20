import { AuthenticationError } from "apollo-server-micro";
import { Bucket } from "../../constants/s3Bucket";
import { Resolvers } from "../../types/generated/graphqlCodeGen";
import { s3 } from "../client/S3";
import { createOrUpsertEntry } from "../createOrUpsertEntry";
import { SessionContextType } from "./context";

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
      await createOrUpsertEntry({ tags, source, pageName, pageTitle });
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
      { contentType: ContentType, key: Key },
      context
    ) => {
      isUser(context);

      return await s3.getSignedUrlPromise("putObject", {
        Bucket,
        Key,
        ContentType,
        Expires: 30,
      });
    },
    getObjectList: async (parent, { key }, context) => {
      isUser(context);
      const { Contents } = await s3
        .listObjectsV2({ Bucket, Prefix: key })
        .promise();
      if (!Contents) return [];
      return Contents.map((e) => e.Key || "");
    },
  },
};
