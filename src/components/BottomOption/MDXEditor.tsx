import { useState, VFC } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { extractContent } from "../../utils/extractContent";
import { Box, Button, Input } from "@chakra-ui/react";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";
import useAxios from "axios-hooks";
import { CreateOrUpsertEntryParams } from "../../services/createOrUpsertEntry";

export const MDXEditor: VFC = () => {
  const pageMeta = useRecoilState(pageMetaAtoms)[0];
  const [value, setValue] = useState<string | undefined>(
    extractContent(pageMeta?.source)
  );
  const [tags, setTags] = useState<string | undefined>(
    pageMeta?.tags.join(",")
  );
  const [{ loading, error }, refetch] = useAxios<
    void,
    CreateOrUpsertEntryParams
  >("/api/post/article", {
    manual: true,
  });
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
          refetch({
            data: {
              tags: tags?.split(",").map((e) => e.trim()),
              source: value,
              pageTitle: pageMeta?.title,
              pageName: pageMeta?.pageName,
            },
            method: "post",
          });
        }}
      >
        投稿
      </Button>
    </Box>
  );
};
