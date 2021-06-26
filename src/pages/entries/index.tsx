import { EntryListPage } from "../../components/pages/EntryListPage";
import { getEntryPageListStaticProps } from "../../services/backend/dataFetcher/getEntryPageListStaticProps";

export const getStaticProps = getEntryPageListStaticProps;
export default EntryListPage;
