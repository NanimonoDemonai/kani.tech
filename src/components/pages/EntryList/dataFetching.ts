import { GetStaticProps } from "next";
import { getEntryPageList } from "../../../services/getEntryPageList";
import { getTagList } from "../../../services/getTagList";
import { EntryListProps } from "./EntryListPage";

export const getEntryPageListStaticProps: GetStaticProps<EntryListProps> =
  async () => {
    const entryPageList = await getEntryPageList();
    const tags = await getTagList();
    return { props: { entryPageList, tags: tags.map((e) => e.tagName) } };
  };
