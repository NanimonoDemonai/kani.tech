import { ReactNode, VFC } from "react";
import {
  Box,
  Collapse,
  Divider,
  Flex,
  HStack,
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
import { BottomOptionToggleButton } from "./BottomOptionToggleButton";
import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";

interface Props {
  children: ReactNode;
}

const DynamicMDXEditor = dynamic<{}>(() =>
  import("./MDXEditor").then((mod) => mod.MDXEditor)
);

export const BottomOption: VFC<Props> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isOpenSource,
    onToggle: onToggleSource,
    onClose: onCloseSource,
  } = useDisclosure();
  const {
    isOpen: isOpenHistory,
    onToggle: onToggleHistory,
    onClose: onCloseHistory,
  } = useDisclosure();
  const { isOpen: isOpenEditor, onToggle: onToggleEditor } = useDisclosure();

  const [session, loading] = useSession();

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
      <HStack spacing={2}>
        <Spacer />
        <BottomOptionToggleButton
          onToggle={() => {
            if (isOpen) {
              onCloseHistory();
              onCloseSource();
            }
            onToggle();
          }}
          isOpen={isOpen}
          label={"オプション"}
        />
        {!loading && session && session.role === "USER" && (
          <BottomOptionToggleButton
            onToggle={onToggleEditor}
            isOpen={isOpenEditor}
            label={"編集する"}
          />
        )}
      </HStack>
      <Flex>
        <Spacer />
        <Collapse in={isOpen} animateOpacity>
          <HStack spacing={2}>
            {children}
            {pageMeta && (
              <BottomOptionToggleButton
                onToggle={onToggleSource}
                isOpen={isOpenSource}
                label={"ソースを表示"}
              />
            )}
            {pageMeta?.revisions && (
              <BottomOptionToggleButton
                onToggle={onToggleHistory}
                isOpen={isOpenHistory}
                label={"履歴を表示"}
              />
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
      {!loading && session && session.role === "USER" && (
        <Collapse in={isOpenEditor} animateOpacity>
          <DynamicMDXEditor />
        </Collapse>
      )}
    </Box>
  );
};
