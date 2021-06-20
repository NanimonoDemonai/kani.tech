import { GetStaticPaths } from "next";
import { MDXHistorySourcePage } from "../../../../components/pages/MDXHistorySourcePage/MDXHistorySourcePage";
import { getMDXHistorySourcePageStaticProps } from "../../../../components/pages/MDXHistorySourcePage/dataFetching";

export default MDXHistorySourcePage;

export const getStaticProps = getMDXHistorySourcePageStaticProps;
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
