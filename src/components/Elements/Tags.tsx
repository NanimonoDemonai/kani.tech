import { VFC } from "react";
import { Button } from "@chakra-ui/react";
import { getTaggedEntryListPathWithTagName } from "../../utils/getURL";
import NextLink from "next/link";
import { useTags } from "../hooks/usePageMeta";

export const Tags: VFC = () => {
  const tags = useTags();
  return (
    <>
      {tags.map((e) => (
        <NextLink href={getTaggedEntryListPathWithTagName(e)} key={e}>
          <Button size="xs">{e}</Button>
        </NextLink>
      ))}
    </>
  );
};
