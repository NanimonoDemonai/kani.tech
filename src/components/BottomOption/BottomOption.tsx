import { ReactNode, VFC } from "react";
import {
  Box,
  Collapse,
  Divider,
  HStack,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { PageModified } from "./PageModified";
import { Tags } from "../Elements/Tags";
import { PageRevision } from "./PageRevision";
import { BottomOptionToggleButton } from "./BottomOptionToggleButton";
import { useEditorIsShown } from "./hooks/useEditorIsShown";

import { usePageMeta } from "../hooks/usePageMeta";
import { useDispatch } from "../hooks/store";
import {
  toggleBottomOptionFileListEditor,
  toggleBottomOptionShow,
  toggleBottomOptionShowHistory,
  toggleBottomOptionShowSource,
} from "../hooks/slices/pageOptionSlice";
import { usePageOption } from "../hooks/usePageOption";
import { BottomImageUploader } from "./BottomImageUploader";
import { BottomEditor } from "./BottomEditor";
import { BottomHistory } from "./BottomHistory";
import { BottomSource } from "./BottomSource";

interface Props {
  children: ReactNode;
}

export const BottomOption: VFC<Props> = ({ children }) => {
  const pageMeta = usePageMeta();
  const editorIsShown = useEditorIsShown();
  const pageOption = usePageOption();
  const dispatch = useDispatch();
  const { onToggle: toggleEditor, isOpen: editorIsOpen } = useDisclosure();
  const isHistoryShown = !!pageMeta?.revisions;
  const source = pageMeta?.source;

  return (
    <Box as={"aside"}>
      <HStack spacing={2}>
        <Tags tags={pageMeta.tags} />
      </HStack>

      <HStack spacing={2}>
        <Spacer />
        <PageModified />
        <PageRevision />
      </HStack>
      <Divider my={1} />
      <HStack spacing={2}>
        <Spacer />
        <BottomOptionToggleButton
          onToggle={() => dispatch(toggleBottomOptionShow())}
          isOpen={pageOption.isBottomOptionShow}
          label={"オプション"}
        />
        {editorIsShown && (
          <BottomOptionToggleButton
            onToggle={toggleEditor}
            isOpen={editorIsOpen}
            label={"編集する"}
          />
        )}
      </HStack>

      <HStack>
        <Spacer />
        <Collapse in={pageOption.isBottomOptionShow} animateOpacity>
          <HStack spacing={2}>
            {children}
            {source && (
              <BottomOptionToggleButton
                onToggle={() => dispatch(toggleBottomOptionShowSource())}
                isOpen={pageOption.isBottomOptionShowSource}
                label={"ソースを表示"}
              />
            )}
            {isHistoryShown && (
              <BottomOptionToggleButton
                onToggle={() => dispatch(toggleBottomOptionShowHistory())}
                isOpen={pageOption.isBottomOptionShowHistory}
                label={"履歴を表示"}
              />
            )}
            {editorIsShown && (
              <BottomOptionToggleButton
                onToggle={() => dispatch(toggleBottomOptionFileListEditor())}
                isOpen={pageOption.isBottomOptionFileListEditor}
                label={"ファイルを表示"}
              />
            )}
          </HStack>
        </Collapse>
      </HStack>

      <BottomSource />
      <BottomHistory />
      {editorIsShown && <BottomEditor editorIsOpen={editorIsOpen} />}
      {editorIsShown && <BottomImageUploader />}
    </Box>
  );
};
