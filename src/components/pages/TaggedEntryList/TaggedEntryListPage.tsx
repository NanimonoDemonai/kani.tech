import { NextPage } from "next";
import { Title } from "../../Metas/Title";
import { Article } from "../../Entry/Article";
import { EntryList } from "../../Entry/EntryList";
import { EntrySummary } from "../../../types/EntrySummary";
import { useRouter } from "next/router";
import { Fallback } from "../../Elements/Fallback";

export interface TaggedEntryListProps {
  entryPageList: EntrySummary[];
}

export const TaggedEntryListPage: NextPage<TaggedEntryListProps> = ({
  entryPageList,
}) => {
  const router = useRouter();
  const { pid } = router.query;
  if (router.isFallback) {
    return <Fallback />;
  }
  return (
    <>
      <Article>
        <Title title={`タグ: ${pid} がついたエントリー一覧`} />
        <EntryList entryPageList={entryPageList} />
      </Article>
    </>
  );
};
