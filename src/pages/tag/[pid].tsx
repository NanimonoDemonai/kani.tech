import { GetStaticPaths } from "next";
import { TaggedEntryListPage } from "../../components/pages/TaggedEntryListPage";
import { getTaggedEntryPageListStaticProps } from "../../services/backend/dataFetcher/getTaggedEntryPageListStaticProps";

export default TaggedEntryListPage;
export const getStaticProps = getTaggedEntryPageListStaticProps;
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
