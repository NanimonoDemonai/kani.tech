import { GetStaticProps } from "next";
import { getEntryPageList } from "../../../constants/EntryPageList";
import { EntryListProps } from "./EntryListPage";

export const getEntryPageListStaticProps: GetStaticProps<EntryListProps> =
  async () => {
    const entryPageList = await getEntryPageList();
    return { props: { entryPageList } };
  };
