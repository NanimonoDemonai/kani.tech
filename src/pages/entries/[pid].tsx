import { EntryPage as EntryPageComponent } from "../../components/pages/EntryPage";

import type { InferGetStaticPropsType, NextPage } from "next";

import { getEntryMeta } from "../../components/entries/dataFetching";

const EntryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  EntryPageComponent;

export const getStaticProps = getEntryMeta;
export default EntryPage;
