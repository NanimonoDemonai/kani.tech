import { TaggedEntryListPage } from "../../components/pages/TaggedEntryListPage";
import { getFallbackStaticPath } from "../../services/backend/dataFetcher/getFallbackStaticPath";
import { getTaggedEntryPageListStaticProps } from "../../services/backend/dataFetcher/getTaggedEntryPageListStaticProps";

export default TaggedEntryListPage;
export const getStaticProps = getTaggedEntryPageListStaticProps;
export const getStaticPaths = getFallbackStaticPath;
