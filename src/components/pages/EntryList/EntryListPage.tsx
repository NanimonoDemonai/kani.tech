import { NextPage } from "next";
import { Title } from "../../Metas/Title";
import { Article } from "../../Entry/Article";
import { Tags } from "../../Elements/Tags";
import { EntryList } from "../../Entry/EntryList";
import { EntrySummary } from "../../../types/EntrySummary";

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
    <Tags tags={tags} />
  </>
);
