import { GetStaticPaths } from "next";

export const getBlockingAllStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
