import { HStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { EntrySummary } from "../../types/EntrySummary";
import { Tags } from "../Elements/Tags";
import { Article } from "../Entry/Article";
import { EntryList } from "../Entry/EntryList";
import { Title } from "../Metas/Title";

export interface EntryListProps {
  entryPageList: EntrySummary[];
  tags: string[];
}

export const EntryListPage: NextPage<EntryListProps> = ({
  entryPageList,
  tags,
}) => (
  <>
    <Article>
      <Title title="エントリー一覧" />
      <EntryList entryPageList={entryPageList} />
    </Article>
    <HStack spacing={2}>
      <Tags tags={tags} />
    </HStack>
  </>
);
