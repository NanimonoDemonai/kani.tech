import { getMDXHistorySourcePageStaticProps } from "../../../../components/pages/MDXHistorySourcePage/dataFetching";
import { MDXHistorySourcePage } from "../../../../components/pages/MDXHistorySourcePage/MDXHistorySourcePage";

export default MDXHistorySourcePage;

export const getStaticProps = getMDXHistorySourcePageStaticProps;
export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};
