import { NextPage } from "next";
import NextLink from "next/link";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { Title } from "../../Metas/Title";
import { HStack, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import { Article } from "../../Entry/Article";
import { DateTime } from "../../Elements/DateTime";

export interface EntryListProps {
  entryPageList: { pageName: string; modified: string }[];
}

export const EntryListPage: NextPage<EntryListProps> = ({ entryPageList }) => (
  <Article>
    <Title title="エントリー一覧" />
    <UnorderedList>
      {entryPageList.map((e) => (
        <ListItem key={e.pageName}>
          <HStack>
            <NextLink href={getEntryPathWithEntryName(e.pageName)}>
              <Link>{e.pageName}</Link>
            </NextLink>
            <DateTime date={e.modified} />
          </HStack>
        </ListItem>
      ))}
    </UnorderedList>
  </Article>
);
