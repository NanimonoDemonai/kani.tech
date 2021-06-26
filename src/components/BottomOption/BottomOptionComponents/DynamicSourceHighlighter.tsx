import dynamic from "next/dynamic";
import { VFC } from "react";
import { Fallback } from "../../Elements/Fallback";
import { useSource } from "../../hooks/usePageMeta";

const SourceHighlighter = dynamic<{ source: string }>(
  () =>
    import("../../Entry/SourceHighlighter").then(
      (mod) => mod.SourceHighlighter
    ),
  {
    ssr: false,
    loading: Fallback,
  }
);

export const DynamicSourceHighlighter: VFC = () => {
  const source = useSource();
  return <SourceHighlighter source={source} />;
};
