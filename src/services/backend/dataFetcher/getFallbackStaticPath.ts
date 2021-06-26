import { GetStaticPaths } from "next";

export const getFallbackStaticPath: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});
