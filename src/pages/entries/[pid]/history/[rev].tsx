import { GetStaticPaths } from "next";
import { MDXHistorySourcePage } from "../../../../components/pages/MDXHistorySourcePage";
import { getMDXHistorySourcePageStaticProps } from "../../../../services/dataFetcher/getMDXHistorySourcePageStaticProps";

export default MDXHistorySourcePage;

export const getStaticProps = getMDXHistorySourcePageStaticProps;
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
