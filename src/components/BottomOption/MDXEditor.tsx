import { useState, VFC } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { extractContent } from "../../utils/extractContent";
import { Box, Button } from "@chakra-ui/react";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";
import useAxios from "axios-hooks";

export const MDXEditor: VFC = () => {
  const pageMeta = useRecoilState(pageMetaAtoms)[0];
  const [value, setValue] = useState<string | undefined>(
    extractContent(pageMeta?.source)
  );
  const [{ loading, error }, refetch] = useAxios("/api/post/article", {
    manual: true,
  });
  return (
    <Box className="container">
      <MDEditor value={value} onChange={setValue} preview={"edit"} />
      <Button
        disabled={loading || !!error}
        onClick={() => {
          refetch({ data: { value }, method: "post" });
        }}
      >
        投稿
      </Button>
    </Box>
  );
};
