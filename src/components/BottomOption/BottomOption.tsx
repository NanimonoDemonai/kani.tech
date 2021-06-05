import { ReactNode, VFC } from "react";
import { Box, Divider, Flex, Spacer } from "@chakra-ui/react";

export const BottomOption: VFC<{ children: ReactNode }> = ({ children }) => (
  <Box>
    <Divider my={4} />
    <Flex>
      <Spacer />
      {children}
    </Flex>
  </Box>
);
