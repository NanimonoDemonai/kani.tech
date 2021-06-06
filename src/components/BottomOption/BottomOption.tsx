import { ReactNode, VFC } from "react";
import {
  Box,
  Collapse,
  Divider,
  Flex,
  HStack,
  Link,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { PageModified } from "./PageModified";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../atoms/pageMetaAtoms";
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";

interface Props {
  children: ReactNode;
}

export const BottomOption: VFC<Props> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isOpenSource, onToggle: onToggleSource } = useDisclosure();
  const pageMeta = useRecoilState(pageMetaAtoms)[0];

  return (
    <Box as={"aside"}>
      <PageModified />
      <Divider my={1} />
      <Flex>
        <Spacer />
        <Link onClick={onToggle} fontSize="sm">
          {isOpen ? "-" : "+"} オプション
        </Link>
      </Flex>
      <Flex>
        <Spacer />
        <Collapse in={isOpen} animateOpacity>
          <HStack spacing={2}>
            {children}
            <Link onClick={onToggleSource} fontSize="sm">
              {isOpenSource ? "-" : "+"} ソースを表示
            </Link>
          </HStack>
        </Collapse>
      </Flex>
      <Collapse in={isOpenSource} animateOpacity>
        {pageMeta && <DynamicSourceHighlighter source={pageMeta.source} />}
      </Collapse>
    </Box>
  );
};
