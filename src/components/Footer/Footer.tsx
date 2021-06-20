import { Center } from "@chakra-ui/react";
import { VFC } from "react";

export const Footer: VFC = () => {
  return (
    <footer>
      <Center
        borderColor="gray.200"
        borderTopStyle="solid"
        borderTopWidth={1}
        p={2}
        color="gray.300"
      >
        Nanimono Demonai
      </Center>
    </footer>
  );
};
