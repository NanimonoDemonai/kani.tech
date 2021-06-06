import dynamic from "next/dynamic";
import { Skeleton, Stack } from "@chakra-ui/react";

export const DynamicSourceHighlighter = dynamic<{ source: string }>(
  () =>
    import("../Entry/SourceHighlighter").then((mod) => mod.SourceHighlighter),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ),
  }
);
