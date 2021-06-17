import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphqlRequestCodeGen";

const rawClient = new GraphQLClient("/api/graphql");
export const gqlClient = getSdk(rawClient);
