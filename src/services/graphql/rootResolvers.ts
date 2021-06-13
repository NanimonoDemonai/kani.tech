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
    getUploadUrl: async (parent, { contentType }, context) => {
      if (context.session?.role !== "USER") {
        throw new AuthenticationError("permission denied");
      }
      return await s3.getSignedUrlPromise("putObject", {
        Bucket: "example-space-name",
        Key: "new-file.ext",
        ContentType: contentType,
        Expires: 30,
      });
    },
  },
};
