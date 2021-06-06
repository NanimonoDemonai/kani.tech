import { MDXSourcePage } from "../../../components/pages/MDXSourcePage/MDXSourcePage";
import { getMDXSourcePageStaticProps } from "../../../components/pages/MDXSourcePage/dataFetching";

export default MDXSourcePage;

export const getStaticProps = getMDXSourcePageStaticProps;
export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};
