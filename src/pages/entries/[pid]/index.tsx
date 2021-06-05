import { EntryPage } from "../../../components/pages/EntryPage/EntryPage";
import { getEntryPageStaticProps } from "../../../components/pages/EntryPage/dataFetching";
import { getBlockingAllStaticPaths } from "../../../components/pages/general/dataFetcher";

export default EntryPage;
export const getStaticProps = getEntryPageStaticProps;
export const getStaticPaths = getBlockingAllStaticPaths;
