import { VFC } from "react";
import { Box } from "@chakra-ui/react";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";

import MDEditorComponent from "@uiw/react-md-editor";
import { useSource } from "../../hooks/useMDXEditor";
import { useDispatch } from "../../hooks/store";
import { setSource } from "../../hooks/slices/MDXInputSlice";

export const MDEditor: VFC = () => {
  const source = useSource();
  const dispatch = useDispatch();
  return (
    <Box className="container" h={"lg"}>
      <MDEditorComponent
        value={source}
        onChange={(e) => dispatch(setSource(`${e}`))}
        preview={"edit"}
        height={512}
      />
    </Box>
  );
};
