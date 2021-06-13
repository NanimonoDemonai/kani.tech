import { VFC } from "react";
import { Box, Button } from "@chakra-ui/react";
import { getTaggedEntryListPathWithTagName } from "../../utils/getURL";
import NextLink from "next/link";

interface Props {
  tags: string[];
}

export const Tags: VFC<Props> = ({ tags }) => (
  <Box>
    {tags.map((e) => (
      <NextLink href={getTaggedEntryListPathWithTagName(e)} key={e}>
        <Button size="xs">{e}</Button>
      </NextLink>
    ))}
  </Box>
);
