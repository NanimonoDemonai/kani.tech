import { NextPage } from "next";
import Link from "next/link";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { Title } from "../../Metas/Title";

export interface EntryListProps {
  entryPageList: string[];
}

export const EntryListPage: NextPage<EntryListProps> = ({ entryPageList }) => (
  <article>
    <Title title="エントリー一覧" />
    <h1>エントリー一覧</h1>
    <ul>
      {entryPageList.map((e) => (
        <li key={e}>
          <Link href={getEntryPathWithEntryName(e)} key={e}>
            {e}
          </Link>
        </li>
      ))}
    </ul>
  </article>
);
