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
import { PageModified } from "./PageModified";

interface Props {
  children: ReactNode;
}

export const BottomOption: VFC<Props> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as={"aside"}>
      <PageModified />
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
