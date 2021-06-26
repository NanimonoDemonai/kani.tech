import { EntryPage } from "../../../components/pages/EntryPage";
import { getEntryPageStaticProps } from "../../../services/backend/dataFetcher/getEntryPageStaticProps";
import { getFallbackStaticPath } from "../../../services/backend/dataFetcher/getFallbackStaticPath";

export default EntryPage;
export const getStaticProps = getEntryPageStaticProps;
export const getStaticPaths = getFallbackStaticPath;
