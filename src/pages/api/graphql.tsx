import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../../schema.graphql";
import { Resolvers } from "../../types/generated/graphqlCodeGen";
import { createOrUpsertEntry } from "../../services/createOrUpsertEntry";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";

interface ContextType {
  session: Session;
}

// Provide resolver functions for your schema fields
const resolvers: Resolvers<ContextType> = {
  Mutation: {
    postArticle: async (
      parent,
      { input: { tags, source, pageName, pageTitle } },
      context
    ) => {
      if (context.session.role !== "USER") {
        throw new Error("permission denied");
      }
      await createOrUpsertEntry({ tags, source, pageName, pageTitle });
      return { id: "1" };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    session: getSession({ req }),
  }),
});

export default server.createHandler({
  path: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};
