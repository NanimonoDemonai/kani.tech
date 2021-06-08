import { NextPage } from "next";
import NextLink from "next/link";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { Title } from "../../Metas/Title";
import { HStack, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import { Article } from "../../Entry/Article";
import { DateTime } from "../../Elements/DateTime";
import { Tags } from "../../Elements/Tags";

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
      <UnorderedList>
        {entryPageList.map(({ pageName, modified }) => (
          <ListItem key={pageName}>
            <HStack>
              <NextLink href={getEntryPathWithEntryName(pageName)}>
                <Link>{pageName}</Link>
              </NextLink>
              <DateTime date={modified} />
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
    </Article>
    <Tags tags={tags} />
  </>
);
