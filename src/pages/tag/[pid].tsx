import { GetStaticPaths } from "next";
import { TaggedEntryListPage } from "../../components/pages/TaggedEntryList/TaggedEntryListPage";
import { getTaggedEntryPageListStaticProps } from "../../components/pages/TaggedEntryList/dataFetching";

export default TaggedEntryListPage;
export const getStaticProps = getTaggedEntryPageListStaticProps;
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
