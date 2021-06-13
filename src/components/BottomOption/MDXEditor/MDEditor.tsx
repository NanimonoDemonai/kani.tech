import { VFC } from "react";
import { Box } from "@chakra-ui/react";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";

import MDEditorComponent from "@uiw/react-md-editor";
import { useRecoilState } from "recoil";
import { MDXSourceInputAtoms } from "./hooks/atoms";

export const MDEditor: VFC = () => {
  const [source, setSource] = useRecoilState(MDXSourceInputAtoms);
  return (
    <Box className="container" h={"lg"}>
      <MDEditorComponent
        value={source}
        onChange={(e) => setSource(`${e}`)}
        preview={"edit"}
        height={512}
      />
    </Box>
  );
};
