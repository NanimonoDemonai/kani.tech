import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";

import { useState, VFC } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { Box, Button, Divider, HStack, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { extractContent } from "../../../utils/extractContent";
import { pageMetaAtoms } from "../../hooks/atoms/pageMetaAtoms";
import { usePostArticleMutation } from "../../../services/client/generated/graphqlCodeGen";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";
import { MDXTagsInputAtoms, MDXTitleInputAtoms } from "./hooks/atoms";

export const MDXEditor: VFC = () => {
  const router = useRouter();

  const pageMeta = useRecoilValue(pageMetaAtoms);
  const [source, setSource] = useState<string | undefined>(
    extractContent(pageMeta?.source)
  );
  const [postArticle, { loading, error }] = usePostArticleMutation({
    onCompleted: () => {
      router.reload();
    },
  });
  const onPost = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const title = await snapshot.getPromise(MDXTitleInputAtoms);
        const tags = await snapshot.getPromise(MDXTagsInputAtoms);

        await postArticle({
          variables: {
            pageName: pageMeta?.pageName || "",
            pageTitle: title,
            source: source || "",
            tags,
          },
        });
      },
    [source, pageMeta]
  );

  return (
    <Box>
      <Stack spacing={2}>
        <TitleInput />
        <Box className="container" h={"lg"}>
          <MDEditor
            value={source}
            onChange={setSource}
            preview={"edit"}
            height={512}
          />
        </Box>
        <TagInput />
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
