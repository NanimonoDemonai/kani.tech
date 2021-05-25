import { NextPage } from "next";
import Link from "next/link";
import { getEntryPathWithEntryName } from "../../utils/getURL";
import { EntryListProps } from "./types";

export const EntryListPage: NextPage<EntryListProps> = ({ entryPageList }) => (
  <>
    <p>エントリー一覧</p>
    {entryPageList.map((e) => (
      <Link href={getEntryPathWithEntryName(e)} key={e}>
        {e}
      </Link>
    ))}
  </>
);
