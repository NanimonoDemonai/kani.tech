import { VFC } from "react";
import { HStack, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import NextLink from "next/link";
import { getEntryPathWithEntryName } from "../../utils/getURL";
import { DateTime } from "../Elements/DateTime";
import { EntrySummary } from "../../types/EntrySummary";

interface Props {
  entryPageList: EntrySummary[];
}

export const EntryList: VFC<Props> = ({ entryPageList }) => (
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
);
