import { Collapse } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { VFC } from "react";
import { MDXEditorProps } from "../../MDXEditor/MDXEditor";
import { usePageMeta } from "../../hooks/usePageMeta";

const DynamicMDXEditor = dynamic<MDXEditorProps>(() =>
  import("../../MDXEditor/MDXEditor").then((mod) => mod.MDXEditor)
);
export const BottomEditor: VFC<{ editorIsOpen: boolean }> = ({
  editorIsOpen,
}) => {
  const pageMeta = usePageMeta();
  return (
    <Collapse in={editorIsOpen} animateOpacity>
      <DynamicMDXEditor {...pageMeta} />
    </Collapse>
  );
};
