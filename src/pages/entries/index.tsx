import type { InferGetStaticPropsType, NextPage } from "next";
import { EntryListPage } from "../../components/entries/EntryList";
import { getEntryPageStaticProps } from "../../components/entries/dataFetching";

const EntryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  EntryListPage;

export const getStaticProps = getEntryPageStaticProps;
export default EntryPage;
