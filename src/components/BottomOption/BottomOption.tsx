import { ReactNode, VFC } from "react";
import { Box, Collapse, Divider, HStack, Spacer } from "@chakra-ui/react";
import { PageModified } from "./PageModified";
import { useRecoilValue } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";
import { Tags } from "../Elements/Tags";
import { PageRevision } from "./PageRevision";
import { RevisionTable } from "./RevisionTable";
import { BottomOptionToggleButton } from "./BottomOptionToggleButton";
import dynamic from "next/dynamic";
import { useEditorIsShown } from "./hooks/useEditorIsShown";
import {
  useBottomOption,
  useIsBottomOptionShowEditor,
  useIsBottomOptionShowFilList,
  useIsBottomOptionShowHistory,
  useIsBottomOptionShowSource,
} from "./hooks/atoms";

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
  const pageMeta = useRecoilValue(pageMetaAtoms);
  const editorIsShown = useEditorIsShown();

  const [isOpen, toggleOptionButton] = useBottomOption();
  const [isOpenSource, onToggleSource] = useIsBottomOptionShowSource();
  const [isOpenHistory, onToggleHistory] = useIsBottomOptionShowHistory();
  const [isOpenEditor, onToggleEditor] = useIsBottomOptionShowEditor();
  const [isOpenFileList, onToggleFileList] = useIsBottomOptionShowFilList();

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
          onToggle={toggleOptionButton}
          isOpen={isOpen}
          label={"オプション"}
        />
        {editorIsShown && (
          <BottomOptionToggleButton
            onToggle={onToggleEditor}
            isOpen={isOpenEditor}
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
                onToggle={onToggleSource}
                isOpen={isOpenSource}
                label={"ソースを表示"}
              />
            )}
            {isHistoryShown && (
              <BottomOptionToggleButton
                onToggle={onToggleHistory}
                isOpen={isOpenHistory}
                label={"履歴を表示"}
              />
            )}
            {editorIsShown && (
              <BottomOptionToggleButton
                onToggle={onToggleFileList}
                isOpen={isOpenFileList}
                label={"ファイルを表示"}
              />
            )}
          </HStack>
        </Collapse>
      </HStack>

      {source && (
        <Collapse in={isOpenSource} animateOpacity>
          <DynamicSourceHighlighter source={source} />
        </Collapse>
      )}

      {isHistoryShown && (
        <Collapse in={isOpenHistory} animateOpacity>
          <RevisionTable />
        </Collapse>
      )}

      {editorIsShown && (
        <Collapse in={isOpenEditor} animateOpacity>
          <DynamicMDXEditor />
        </Collapse>
      )}
      {editorIsShown && (
        <Collapse in={isOpenFileList} animateOpacity>
          <DynamicImageUploader />
        </Collapse>
      )}
    </Box>
  );
};
