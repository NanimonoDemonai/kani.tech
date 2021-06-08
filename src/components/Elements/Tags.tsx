import { VFC } from "react";
import { Button, HStack, Spacer } from "@chakra-ui/react";
import { getTaggedEntryListPathWithTagName } from "../../utils/getURL";
import NextLink from "next/link";

interface Props {
  tags: string[];
}

export const Tags: VFC<Props> = ({ tags }) => (
  <HStack>
    <Spacer />
    {tags.map((e) => (
      <NextLink href={getTaggedEntryListPathWithTagName(e)}>
        <Button size="xs">{e}</Button>
      </NextLink>
    ))}
  </HStack>
);
