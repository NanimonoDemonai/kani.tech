import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../../schema.graphql";
import { getContext } from "../../services/graphql/context";
import { rootResolvers } from "../../services/graphql/rootResolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers: rootResolvers,
  context: getContext,
});

export default server.createHandler({
  path: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};
