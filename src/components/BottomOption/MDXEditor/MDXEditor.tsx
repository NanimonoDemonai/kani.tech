import { VFC } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { Box, Button, Divider, HStack, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { pageMetaAtoms } from "../../hooks/atoms/pageMetaAtoms";
import { usePostArticleMutation } from "../../../services/client/generated/graphqlCodeGen";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";
import {
  MDXSourceInputAtoms,
  MDXTagsInputAtoms,
  MDXTitleInputAtoms,
} from "./hooks/atoms";
import { MDEditor } from "./MDEditor";
import { useSetMDXEditorAtomsEffect } from "./hooks/useSetMDXEditorAtomsEffect";

export const MDXEditor: VFC = () => {
  const router = useRouter();
  const pageMeta = useRecoilValue(pageMetaAtoms);
  useSetMDXEditorAtomsEffect();
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
        const source = await snapshot.getPromise(MDXSourceInputAtoms);

        await postArticle({
          variables: {
            pageName: pageMeta?.pageName || "",
            pageTitle: title,
            source: source,
            tags,
          },
        });
      },
    [pageMeta]
  );

  return (
    <Box>
      <Stack spacing={2}>
        <TitleInput />
        <MDEditor />
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
