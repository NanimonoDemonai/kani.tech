import { Box } from "@chakra-ui/react";
import { VFC } from "react";
import { useEditorIsShown } from "../../hooks/useEditorIsShown";
import { BottomEditor } from "./BottomEditor";
import { BottomHistory } from "./BottomHistory";
import { BottomImageUploader } from "./BottomImageUploader";
import { BottomSource } from "./BottomSource";

export const BottomOptionComponents: VFC = () => {
  const editorIsShown = useEditorIsShown();

  return (
    <Box>
      <BottomSource />
      <BottomHistory />
      {editorIsShown && <BottomEditor />}
      <BottomImageUploader />
    </Box>
  );
};
