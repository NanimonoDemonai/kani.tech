import { VFC } from "react";
import { HStack, Spacer, Tag } from "@chakra-ui/react";

interface Props {
  tags: string[];
}

export const Tags: VFC<Props> = ({ tags }) => (
  <HStack>
    <Spacer />
    {tags.map((e) => (
      <Tag>{e}</Tag>
    ))}
  </HStack>
);
