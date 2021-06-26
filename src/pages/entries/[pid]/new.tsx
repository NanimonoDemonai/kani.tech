import { NewPage } from "../../../components/pages/NewPage";
import { getNewPageServerSideProps } from "../../../services/backend/dataFetcher/getNewPageServerSideProps";

export default NewPage;
export const getServerSideProps = getNewPageServerSideProps;
