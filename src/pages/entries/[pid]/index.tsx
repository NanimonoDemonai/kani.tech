import { EntryPage } from "../../../components/pages/EntryPage/EntryPage";
import { getEntryPageStaticProps } from "../../../components/pages/EntryPage/dataFetching";

export default EntryPage;
export const getStaticProps = getEntryPageStaticProps;
export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};
