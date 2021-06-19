import { useCallback, useEffect, useState, VFC } from "react";
import { Box, Button, Divider, HStack, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";

import { MDEditor } from "./MDEditor";
import { gqlClient } from "../../services/client/graphqlRequest";
import { usePageMeta } from "../hooks/usePageMeta";
import { useDispatch, useSelector } from "../hooks/store";
import { setMDXInput } from "../hooks/slices/MDXInputSlice";

export const MDXEditor: VFC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pageMeta = usePageMeta();
  const { title, tags, source } = useSelector((state) => state.MDXInput);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    dispatch(
      setMDXInput({
        source: pageMeta.source,
        tags: pageMeta.tags,
        title: pageMeta.title,
      })
    );
  }, [dispatch, pageMeta]);
  const execute = useCallback(async () => {
    setDisabled(true);
    await gqlClient.PostArticle({
      pageName: pageMeta.pageName,
      pageTitle: title,
      source: source,
      tags,
    });
    await router.reload();
  }, [setDisabled, pageMeta, tags, title, source, router]);

  return (
    <Box>
      <Stack spacing={2}>
        <TitleInput />
        <MDEditor />
        <TagInput />
      </Stack>
      <Divider my={2} />
      <HStack>
        <Button disabled={disabled} onClick={execute}>
          投稿
        </Button>
      </HStack>
    </Box>
  );
};
