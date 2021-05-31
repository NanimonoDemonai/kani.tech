import { GetStaticProps } from "next";
import { getEntryPageList } from "../../../constants/EntryPageList";
import { EntryListProps } from "../types";

export const getEntryPageStaticProps: GetStaticProps<EntryListProps> =
  async () => {
    const entryPageList = await getEntryPageList();
    return { props: { entryPageList } };
  };
