import { Box, Divider, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { MDXInputSliceReducer } from "../hooks/slices/MDXInputSlice";
import { useInjectReducer } from "../hooks/store";
import { MDEditor } from "./MDEditor";
import { SubmitButton } from "./SubmitButton";
import { TagInput } from "./TagInput";
import { TitleInput } from "./TitleInput";

export const MDXEditor: VFC = () => {
  useInjectReducer({ MDXInput: MDXInputSliceReducer });

  return (
    <Box>
      <Stack spacing={2}>
        <TitleInput />
        <MDEditor />
        <TagInput />
      </Stack>
      <Divider my={2} />
      <SubmitButton />
    </Box>
  );
};
