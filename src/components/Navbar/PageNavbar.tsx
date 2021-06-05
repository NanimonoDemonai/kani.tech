import { VFC } from "react";
import Link from "next/link";
import { Flex } from "@chakra-ui/react";

export const PageNavbar: VFC = () => (
  <Flex w="100%">
    <Link href="/">🦀Kani.tech</Link>
    <Link href="/entries">Entries</Link>
    <a href="https://github.com/NanimonoDemonai/kani.tech">Github</a>
  </Flex>
);
