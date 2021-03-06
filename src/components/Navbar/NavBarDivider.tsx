import { Center, StackDivider } from "@chakra-ui/react";
import { VFC } from "react";

export const NavBarDivider: VFC = () => (
  <Center h="5">
    <StackDivider borderLeft="1px" borderLeftColor="gray.200" />
  </Center>
);
