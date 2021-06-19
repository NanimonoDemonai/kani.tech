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
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";
import { Tags } from "../Elements/Tags";
import { PageRevision } from "./PageRevision";
import { RevisionTable } from "./RevisionTable";
import { BottomOptionToggleButton } from "./BottomOptionToggleButton";
import dynamic from "next/dynamic";
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

interface Props {
  children: ReactNode;
}

const DynamicMDXEditor = dynamic<{}>(() =>
  import("./MDXEditor/MDXEditor").then((mod) => mod.MDXEditor)
);

const DynamicImageUploader = dynamic<{}>(() =>
  import("./Uploader/ImageUploader").then((mod) => mod.ImageUploader)
);

export const BottomOption: VFC<Props> = ({ children }) => {
  const pageMeta = usePageMeta();
  const editorIsShown = useEditorIsShown();
  const pageOption = usePageOption();
  const dispatch = useDispatch();
  const { onToggle, isOpen } = useDisclosure();
  const isHistoryShown = !!pageMeta?.revisions;
  const source = pageMeta?.source;

  return (
    <Box as={"aside"}>
      <HStack spacing={2}>
        <Tags tags={pageMeta?.tags ?? []} />
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
            onToggle={onToggle}
            isOpen={isOpen}
            label={"編集する"}
          />
        )}
      </HStack>

      <HStack>
        <Spacer />
        <Collapse in={isOpen} animateOpacity>
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

      {source && (
        <Collapse in={pageOption.isBottomOptionShowSource} animateOpacity>
          <DynamicSourceHighlighter source={source} />
        </Collapse>
      )}

      {isHistoryShown && (
        <Collapse in={pageOption.isBottomOptionShowHistory} animateOpacity>
          <RevisionTable />
        </Collapse>
      )}

      {editorIsShown && (
        <Collapse in={pageOption.isBottomOptionShowEditor} animateOpacity>
          <DynamicMDXEditor />
        </Collapse>
      )}
      {editorIsShown && (
        <Collapse in={pageOption.isBottomOptionFileListEditor} animateOpacity>
          <DynamicImageUploader />
        </Collapse>
      )}
    </Box>
  );
};
