import { VFC } from "react";
import { Box } from "@chakra-ui/react";
import { BottomSource } from "./BottomSource";
import { BottomHistory } from "./BottomHistory";
import { BottomEditor } from "./BottomEditor";
import { BottomImageUploader } from "./BottomImageUploader";
import { useEditorIsShown } from "../hooks/useEditorIsShown";
import { usePageOption } from "../../hooks/usePageOption";

export const BottomOptionComponents: VFC = () => {
  const editorIsShown = useEditorIsShown();
  const pageOption = usePageOption();

  return (
    <Box>
      <BottomSource />
      <BottomHistory />
      {editorIsShown && (
        <BottomEditor editorIsOpen={pageOption.isBottomOptionShowEditor} />
      )}
      <BottomImageUploader />
    </Box>
  );
};
