import { GetStaticProps } from "next";
import { EntryListProps } from "./EntryListPage";
import { getEntryPageList } from "../../services/getEntryPageList";

export const getEntryPageListStaticProps: GetStaticProps<EntryListProps> =
  async () => {
    const entryPageList = await getEntryPageList();
    return { props: { entryPageList } };
  };
