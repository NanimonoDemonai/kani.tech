import { VFC } from "react";
import { useRecoilSnapshot, useRecoilValue } from "recoil";
import { Box, Button, Divider, HStack, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { pageMetaAtoms } from "../../hooks/atoms/pageMetaAtoms";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";
import {
  MDXSourceInputAtoms,
  MDXTagsInputAtoms,
  MDXTitleInputAtoms,
} from "./hooks/atoms";
import { MDEditor } from "./MDEditor";
import { useSetMDXEditorAtomsEffect } from "./hooks/useSetMDXEditorAtomsEffect";
import { useAsyncCallback } from "react-async-hook";
import { gqlClient } from "../../../services/client/graphqlRequest";

export const MDXEditor: VFC = () => {
  useSetMDXEditorAtomsEffect();
  const router = useRouter();
  const pageMeta = useRecoilValue(pageMetaAtoms);
  const snapshot = useRecoilSnapshot();

  const { loading, error, execute } = useAsyncCallback(async () => {
    const title = await snapshot.getPromise(MDXTitleInputAtoms);
    const tags = await snapshot.getPromise(MDXTagsInputAtoms);
    const source = await snapshot.getPromise(MDXSourceInputAtoms);
    await gqlClient.PostArticle({
      pageName: pageMeta?.pageName || "",
      pageTitle: title,
      source: source,
      tags,
    });
    await router.reload();
  });

  return (
    <Box>
      <Stack spacing={2}>
        <TitleInput />
        <MDEditor />
        <TagInput />
      </Stack>
      <Divider my={2} />
      <HStack>
        <Button disabled={loading || !!error} onClick={execute}>
          投稿
        </Button>
      </HStack>
    </Box>
  );
};
