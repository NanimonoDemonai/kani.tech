import { NextPage } from "next";
import Link from "next/link";
import { getEntryPathWithEntryName } from "../../../utils/getURL";

export interface EntryListProps {
  entryPageList: string[];
}

export const EntryListPage: NextPage<EntryListProps> = ({ entryPageList }) => (
  <article>
    <p>エントリー一覧</p>
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
