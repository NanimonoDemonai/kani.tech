import { useEffect, VFC } from "react";
import { Box, Button, Divider, HStack, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";

import { MDEditor } from "./MDEditor";
import { useAsyncCallback } from "react-async-hook";
import { gqlClient } from "../../services/client/graphqlRequest";
import { usePageMeta } from "../hooks/usePageMeta";
import { useDispatch, useSelector } from "../hooks/store";
import { setMDXInput } from "../hooks/slices/MDXInputSlice";

export const MDXEditor: VFC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pageMeta = usePageMeta();
  const { title, tags, source } = useSelector((state) => state.MDXInput);
  useEffect(() => {
    dispatch(
      setMDXInput({
        source: pageMeta.source,
        tags: pageMeta.tags,
        title: pageMeta.title,
      })
    );
  }, [dispatch, pageMeta]);
  const { loading, execute } = useAsyncCallback(async () => {
    await gqlClient.PostArticle({
      pageName: pageMeta.pageName,
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
        <Button disabled={loading} onClick={execute}>
          投稿
        </Button>
      </HStack>
    </Box>
  );
};
