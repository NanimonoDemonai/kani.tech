import { getTaggedEntryPageListStaticProps } from "../../components/pages/TaggedEntryList/dataFetching";
import { TaggedEntryListPage } from "../../components/pages/TaggedEntryList/TaggedEntryListPage";

export default TaggedEntryListPage;
export const getStaticProps = getTaggedEntryPageListStaticProps;
export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};
