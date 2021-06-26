import { Benzene, makeHandler } from "@benzene/http";
import { makeCompileQuery } from "@benzene/jit";
import { makeExecutableSchema } from "graphql-tools";
import { NextApiHandler, NextApiRequest } from "next";
import typeDefs from "../../../../schema.graphql";
import { getContext, SessionContextType } from "./context";
import { AuthenticationError, rootResolvers } from "./rootResolvers";

const graphqlHTTP = makeHandler(
  new Benzene<SessionContextType, { req: NextApiRequest }>({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: rootResolvers,
    }),
    contextFn: async ({ extra }) => {
      return await getContext(extra);
    },
    formatErrorFn: (error) => {
      if (error instanceof AuthenticationError) {
        return error;
      }
      return new Error("internal error");
    },
    compileQuery: makeCompileQuery(),
  })
);

export const graphQLHandler: NextApiHandler = (req, res) =>
  graphqlHTTP(
    {
      method: req.method ?? "",
      headers: req.headers,
      body: req.body,
    },
    { req }
  ).then((result) => {
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value ?? "");
    }
    res.status(result.status).send(result.payload);
  });
