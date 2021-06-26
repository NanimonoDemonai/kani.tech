import { GetStaticPaths } from "next";
import { EntryPage } from "../../../components/pages/EntryPage";
import { getEntryPageStaticProps } from "../../../services/backend/dataFetcher/getEntryPageStaticProps";

export default EntryPage;
export const getStaticProps = getEntryPageStaticProps;
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
