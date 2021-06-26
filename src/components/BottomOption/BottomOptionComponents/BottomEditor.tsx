import dynamic from "next/dynamic";
import { VFC } from "react";
import { useIsBottomOptionShowEditor } from "../../hooks/usePageOption";
import { DynamicCollapse } from "./DynamicCollapse";

const DynamicMDXEditor = dynamic<unknown>(() =>
  import("../../MDXEditor/MDXEditor").then((mod) => mod.MDXEditor)
);
export const BottomEditor: VFC = () => {
  const editorIsOpen = useIsBottomOptionShowEditor();

  return <DynamicCollapse isOpen={editorIsOpen} Render={DynamicMDXEditor} />;
};
