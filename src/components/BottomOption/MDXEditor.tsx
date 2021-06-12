import { useState, VFC } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { extractContent } from "../../utils/extractContent";
import { Box, Button, Input } from "@chakra-ui/react";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";
import { usePostArticleMutation } from "../../services/client/generated/graphqlCodeGen";

export const MDXEditor: VFC = () => {
  const pageMeta = useRecoilState(pageMetaAtoms)[0];
  const [value, setValue] = useState<string | undefined>(
    extractContent(pageMeta?.source)
  );
  const [tags, setTags] = useState<string | undefined>(
    pageMeta?.tags.join(",")
  );
  const [postArticle, { loading, error }] = usePostArticleMutation();
  return (
    <Box className="container">
      <Input
        placeholder="Basic usage"
        value={tags}
        onChange={(e) => {
          setTags(e.target.value);
        }}
      />
      <MDEditor value={value} onChange={setValue} preview={"edit"} />
      <Button
        disabled={loading || !!error}
        onClick={() => {
          postArticle({
            variables: {
              pageName: pageMeta?.pageName || "",
              pageTitle: pageMeta?.title || "",
              source: value || "",
              tags: tags?.split(",").map((e) => e.trim()) || [],
            },
          });
        }}
      >
        投稿
      </Button>
    </Box>
  );
};
