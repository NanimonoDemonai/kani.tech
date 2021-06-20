import { Box } from "@chakra-ui/react";
import { ReactNode, VFC } from "react";

interface Props {
  children: ReactNode;
}

export const Article: VFC<Props> = ({ children }) => (
  <Box as={"article"} minH={"2xl"}>
    {children}
  </Box>
);
