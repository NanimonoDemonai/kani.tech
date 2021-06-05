import { MDXSourcePage } from "../../../components/pages/MDXSourcePage/MDXSourcePage";
import { getMDXSourcePageStaticProps } from "../../../components/pages/MDXSourcePage/dataFetching";
import { getBlockingAllStaticPaths } from "../../../components/pages/general/dataFetcher";

export default MDXSourcePage;

export const getStaticProps = getMDXSourcePageStaticProps;
export const getStaticPaths = getBlockingAllStaticPaths;
