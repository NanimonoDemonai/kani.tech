import { Collapse } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { VFC } from "react";

const DynamicMDXEditor = dynamic<unknown>(() =>
  import("../../MDXEditor/MDXEditor").then((mod) => mod.MDXEditor)
);
export const BottomEditor: VFC<{ editorIsOpen: boolean }> = ({
  editorIsOpen,
}) => {
  return (
    <Collapse in={editorIsOpen} animateOpacity>
      <DynamicMDXEditor />
    </Collapse>
  );
};
