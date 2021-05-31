import type { InferGetStaticPropsType, NextPage } from "next";
import { EntryListPage } from "../../components/pages/EntryListPage";
import { getEntryPageListStaticProps } from "../../components/pages/EntryList/dataFetching";

const EntryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  EntryListPage;

export const getStaticProps = getEntryPageListStaticProps;
export default EntryPage;
