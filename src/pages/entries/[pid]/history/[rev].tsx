import { MDXHistorySourcePage } from "../../../../components/pages/MDXHistorySourcePage";
import { getFallbackStaticPath } from "../../../../services/backend/dataFetcher/getFallbackStaticPath";
import { getMDXHistorySourcePageStaticProps } from "../../../../services/backend/dataFetcher/getMDXHistorySourcePageStaticProps";

export default MDXHistorySourcePage;

export const getStaticProps = getMDXHistorySourcePageStaticProps;
export const getStaticPaths = getFallbackStaticPath;
