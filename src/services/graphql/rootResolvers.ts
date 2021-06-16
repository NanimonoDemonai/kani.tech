import { AuthenticationError } from "apollo-server-micro";
import { Resolvers } from "../../types/generated/graphqlCodeGen";
import { s3 } from "../client/S3";
import { createOrUpsertEntry } from "../createOrUpsertEntry";

export const rootResolvers: Resolvers = {
  Mutation: {
    postArticle: async (
      parent,
      { input: { tags, source, pageName, pageTitle } },
      context
    ) => {
      if (context.session?.role !== "USER") {
        throw new AuthenticationError("permission denied");
      }
      await createOrUpsertEntry({ tags, source, pageName, pageTitle });
      return { id: "1" };
    },
  },
  Query: {
    healthCheck: () => "hello",
    getUploadUrl: async (parent, { contentType, key }, context) => {
      if (context.session?.role !== "USER") {
        throw new AuthenticationError("permission denied");
      }
      return await s3.getSignedUrlPromise("putObject", {
        Bucket: "example-space-name",
        Key: key,
        ContentType: contentType,
        Expires: 30,
      });
    },
    getObjectList: async (parent, { key }, context) => {
      if (context.session?.role !== "USER") {
        throw new AuthenticationError("permission denied");
      }

      const { Contents } = await s3
        .listObjectsV2({
          Bucket: "example-space-name",
          Prefix: key,
        })
        .promise();
      if (!Contents) return [];
      return Contents.map((e) => e.Key || "");
    },
  },
};
