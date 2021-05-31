import { GetStaticPaths, GetStaticProps } from "next";
import { MDXSourcePage } from "../../../components/pages/MDXSourcePage/MDXSourcePage";
import { getMDXSourcePageStaticProps } from "../../../components/pages/MDXSourcePage/dataFetching";

export default MDXSourcePage;

export const getStaticProps: GetStaticProps = getMDXSourcePageStaticProps;
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
