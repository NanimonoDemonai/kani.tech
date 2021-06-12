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
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";
import { Tags } from "../Elements/Tags";
import { PageRevision } from "./PageRevision";
import { RevisionTable } from "./RevisionTable";

interface Props {
  children: ReactNode;
}

export const BottomOption: VFC<Props> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isOpenSource, onToggle: onToggleSource } = useDisclosure();
  const { isOpen: isOpenHistory, onToggle: onToggleHistory } = useDisclosure();

  const pageMeta = useRecoilState(pageMetaAtoms)[0];

  return (
    <Box as={"aside"}>
      <Tags tags={pageMeta?.tags ?? []} />
      <HStack spacing={2}>
        <Spacer />
        <PageModified />
        <PageRevision />
      </HStack>
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
            {pageMeta && (
              <Link onClick={onToggleSource} fontSize="sm">
                {isOpenSource ? "-" : "+"} ソースを表示
              </Link>
            )}
            {pageMeta?.revisions && (
              <Link onClick={onToggleHistory} fontSize="sm">
                {isOpenHistory ? "-" : "+"} 履歴を表示
              </Link>
            )}
          </HStack>
        </Collapse>
      </Flex>
      {pageMeta && (
        <Collapse in={isOpenSource} animateOpacity>
          <DynamicSourceHighlighter source={pageMeta.source} />
        </Collapse>
      )}
      {pageMeta?.revisions && (
        <Collapse in={isOpenHistory} animateOpacity>
          <RevisionTable />
        </Collapse>
      )}
    </Box>
  );
};
