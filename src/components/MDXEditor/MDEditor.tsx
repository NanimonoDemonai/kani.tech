import { Box } from "@chakra-ui/react";
import MDEditorComponent from "@uiw/react-md-editor";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";
import { VFC } from "react";
import { setSource } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useSource } from "../hooks/useMDXEditor";

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
