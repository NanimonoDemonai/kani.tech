import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../../schema.graphql";
// This data will be returned by our test endpoint
const products = [
  {
    id: 1,
    name: "Cookie",
    price: 300,
  },
  {
    id: 2,
    name: "Brownie",
    price: 350,
  },
];

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    products: () => {
      return products;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({
  path: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};
