import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";

import { useCallback, useState, VFC } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilValue } from "recoil";
import { Box, Button, Divider, HStack, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { extractContent } from "../../../utils/extractContent";
import { pageMetaAtoms } from "../../hooks/atoms/pageMetaAtoms";
import { usePostArticleMutation } from "../../../services/client/generated/graphqlCodeGen";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";

export const MDXEditor: VFC = () => {
  const router = useRouter();

  const pageMeta = useRecoilValue(pageMetaAtoms);
  const [source, setSource] = useState<string | undefined>(
    extractContent(pageMeta?.source)
  );
  const [tags, setTags] = useState<string[]>(pageMeta?.tags || []);
  const [title, setTitle] = useState<string>(pageMeta?.title || "");
  const [postArticle, { loading, error }] = usePostArticleMutation({
    onCompleted: () => {
      router.reload();
    },
  });
  const onPost = useCallback(async () => {
    await postArticle({
      variables: {
        pageName: pageMeta?.pageName || "",
        pageTitle: title || "",
        source: source || "",
        tags,
      },
    });
  }, [title, source, tags, pageMeta]);

  return (
    <Box>
      <Stack spacing={2}>
        <TitleInput setTitle={setTitle} title={title} />
        <Box className="container" h={"lg"}>
          <MDEditor
            value={source}
            onChange={setSource}
            preview={"edit"}
            height={512}
          />
        </Box>
        <TagInput tags={tags} setTags={setTags} />
      </Stack>
      <Divider my={2} />
      <HStack>
        <Button disabled={loading || !!error} onClick={onPost}>
          投稿
        </Button>
      </HStack>
    </Box>
  );
};
