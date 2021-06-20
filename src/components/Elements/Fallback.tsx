import { Skeleton, Stack } from "@chakra-ui/react";
import { VFC } from "react";

export const Fallback: VFC = () => (
  <Stack>
    <Skeleton height="20px" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
  </Stack>
);
