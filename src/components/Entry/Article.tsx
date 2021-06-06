import { ReactNode, VFC } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

export const Article: VFC<Props> = ({ children }) => (
  <Box as={"article"} minH={"2xl"}>
    {children}
  </Box>
);
