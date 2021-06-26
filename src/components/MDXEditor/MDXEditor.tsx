import { Box, Divider, Stack } from "@chakra-ui/react";
import { useEffect, VFC } from "react";

import {
  MDXInputSliceReducer,
  setMDXInput,
} from "../hooks/slices/MDXInputSlice";
import { useDispatch, useInjectReducer } from "../hooks/store";
import { usePageMeta } from "../hooks/usePageMeta";
import { MDEditor } from "./MDEditor";
import { SubmitButton } from "./SubmitButton";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";

export const MDXEditor: VFC = () => {
  const dispatch = useDispatch();
  const pageMeta = usePageMeta();
  useInjectReducer({ MDXInput: MDXInputSliceReducer });
  useEffect(() => {
    dispatch(setMDXInput(pageMeta));
  }, [dispatch, pageMeta]);

  return (
    <Box>
      <Stack spacing={2}>
        <TitleInput />
        <MDEditor />
        <TagInput />
      </Stack>
      <Divider my={2} />
      <SubmitButton pageName={pageMeta.pageName} />
    </Box>
  );
};
