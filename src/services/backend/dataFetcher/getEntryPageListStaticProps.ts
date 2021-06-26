import { GetStaticProps } from "next";
import { EntryListProps } from "../../../components/pages/EntryListPage";
import { getEntryPageList } from "../getEntryPageList";
import { getTagList } from "../getTagList";

export const getEntryPageListStaticProps: GetStaticProps<EntryListProps> =
  async () => {
    const entryPageList = await getEntryPageList();
    const tags = await getTagList();
    return { props: { entryPageList, tags: tags.map((e) => e.tagName) } };
  };
