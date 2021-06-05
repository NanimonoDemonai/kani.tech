import { ReactNode, VFC } from "react";
import {
  Box,
  Collapse,
  Divider,
  Flex,
  Link,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

export const BottomOption: VFC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as={"aside"}>
      <Divider my={1} />
      <Flex>
        <Spacer />
        <Link onClick={onToggle} fontSize="sm">
          + オプション
        </Link>
      </Flex>
      <Flex>
        <Spacer />
        <Collapse in={isOpen} animateOpacity>
          {children}
        </Collapse>
      </Flex>
    </Box>
  );
};
