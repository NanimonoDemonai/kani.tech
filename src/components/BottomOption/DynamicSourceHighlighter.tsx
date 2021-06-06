import dynamic from "next/dynamic";
import { Fallback } from "../Elements/Fallback";

export const DynamicSourceHighlighter = dynamic<{ source: string }>(
  () =>
    import("../Entry/SourceHighlighter").then((mod) => mod.SourceHighlighter),
  {
    ssr: false,
    loading: Fallback,
  }
);
