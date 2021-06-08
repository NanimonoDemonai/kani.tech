import { NextPage } from "next";
import { Title } from "../../Metas/Title";
import { Article } from "../../Entry/Article";
import { Tags } from "../../Elements/Tags";
import { EntryList } from "../../Entry/EntryList";

export interface EntryListProps {
  entryPageList: { pageName: string; modified: string }[];
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
