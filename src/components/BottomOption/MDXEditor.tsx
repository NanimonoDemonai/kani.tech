import { useState, VFC } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { extractContent } from "../../utils/extractContent";
import { Box } from "@chakra-ui/react";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";

export const MDXEditor: VFC = () => {
  const pageMeta = useRecoilState(pageMetaAtoms)[0];
  const [value, setValue] = useState<string | undefined>(
    extractContent(pageMeta?.source)
  );
  return (
    <Box className="container">
      <MDEditor value={value} onChange={setValue} preview={"edit"} />
    </Box>
  );
};
