import { Center, LinkBox, LinkOverlay } from "@chakra-ui/react";
import NextLink from "next/link";
import { VFC } from "react";

export const KaniButton: VFC = () => (
  <LinkBox borderWidth="1px" rounded="md">
    <Center w="40px" h="40px">
      <NextLink href="/" passHref>
        <LinkOverlay>🦀</LinkOverlay>
      </NextLink>
    </Center>
  </LinkBox>
);
