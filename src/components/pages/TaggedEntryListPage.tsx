import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { EntrySummary } from "../../types/EntrySummary";
import { Fallback } from "../Elements/Fallback";
import { Article } from "../Entry/Article";
import { EntryList } from "../Entry/EntryList";
import { Title } from "../Metas/Title";

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
    <Box>
      <Article>
        <Title title={`タグ: ${pid} がついたエントリー一覧`} />
        <EntryList entryPageList={entryPageList} />
      </Article>
    </Box>
  );
};
