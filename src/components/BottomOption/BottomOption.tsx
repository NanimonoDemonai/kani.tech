import { ReactNode, VFC } from "react";
import {
  Box,
  Collapse,
  Divider,
  Flex,
  HStack,
  Link,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PageModified } from "./PageModified";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";
import { Tags } from "../Elements/Tags";
import { PageRevision } from "./PageRevision";
import { DateTime } from "../Elements/DateTime";
import NextLink from "next/link";

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
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>リビジョン</Th>
                <Th>更新日</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pageMeta.revisions.map((e) => (
                <Tr>
                  <Td>
                    <NextLink
                      href={`/entries/${pageMeta.pageName}/history/${pageMeta.revision}`}
                    >
                      <Link>{e.revision}</Link>
                    </NextLink>
                  </Td>
                  <Td>
                    <DateTime date={e.createdAt} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Collapse>
      )}
    </Box>
  );
};
