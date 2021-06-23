import { Benzene, makeHandler } from "@benzene/http";
import { makeExecutableSchema } from "graphql-tools";
import { NextApiHandler } from "next";
import typeDefs from "../../../schema.graphql";
import { getContext } from "../../services/graphql/context";
import { rootResolvers } from "../../services/graphql/rootResolvers";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: rootResolvers,
});

const GQL = new Benzene({
  schema,
  contextFn: async ({ extra }) => {
    return await getContext(extra);
  },
});

const graphqlHTTP = makeHandler(GQL);

const handler: NextApiHandler = (req, res) => {
  return graphqlHTTP(
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      method: req.method,
      headers: req.headers,
      body: req.body,
    },
    { req }
  ).then((result) => {
    for (const [key, value] of Object.entries(result.headers)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      res.setHeader(key, value);
    }
    res.status(result.status).send(result.payload);
  });
};
export default handler;
