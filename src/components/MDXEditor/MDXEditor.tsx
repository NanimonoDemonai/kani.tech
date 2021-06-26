import { Box, Divider, Stack } from "@chakra-ui/react";
import { useEffect, VFC } from "react";

import {
  MDXInputSliceReducer,
  setMDXInput,
} from "../hooks/slices/MDXInputSlice";
import { useDispatch, useInjectReducer } from "../hooks/store";
import { MDEditor } from "./MDEditor";
import { SubmitButton } from "./SubmitButton";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";

export interface MDXEditorProps {
  source: string;
  tags: string[];
  title: string;
  pageName: string;
}

export const MDXEditor: VFC<MDXEditorProps> = ({
  title,
  tags,
  source,
  pageName,
}) => {
  const dispatch = useDispatch();
  useInjectReducer({ MDXInput: MDXInputSliceReducer });
  useEffect(() => {
    dispatch(setMDXInput({ source, tags, title }));
  }, [dispatch, title, tags, source]);

  return (
    <Box>
      <Stack spacing={2}>
        <TitleInput />
        <MDEditor />
        <TagInput />
      </Stack>
      <Divider my={2} />
      <SubmitButton pageName={pageName} />
    </Box>
  );
};
