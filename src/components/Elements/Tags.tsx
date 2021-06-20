import { Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { VFC } from "react";
import { getTaggedEntryListPathWithTagName } from "../../utils/getURL";

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
