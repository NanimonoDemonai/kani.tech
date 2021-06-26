import { EntryListPage } from "../../components/pages/EntryList/EntryListPage";
import { getEntryPageListStaticProps } from "../../services/dataFetcher/getEntryPageListStaticProps";

export const getStaticProps = getEntryPageListStaticProps;
export default EntryListPage;
