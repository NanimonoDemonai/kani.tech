import { NextPage } from "next";
import NextLink from "next/link";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { Title } from "../../Metas/Title";
import { Link, ListItem, UnorderedList } from "@chakra-ui/react";

export interface EntryListProps {
  entryPageList: string[];
}

export const EntryListPage: NextPage<EntryListProps> = ({ entryPageList }) => (
  <article>
    <Title title="エントリー一覧" />
    <UnorderedList>
      {entryPageList.map((e) => (
        <ListItem key={e}>
          <NextLink href={getEntryPathWithEntryName(e)} key={e}>
            <Link>{e}</Link>
          </NextLink>
        </ListItem>
      ))}
    </UnorderedList>
  </article>
);
