import { Collapse } from "@chakra-ui/react";
import { VFC } from "react";
import { MDXEditor } from "../../MDXEditor/MDXEditor";

export const BottomEditor: VFC<{ editorIsOpen: boolean }> = ({
  editorIsOpen,
}) => (
  <Collapse in={editorIsOpen} animateOpacity>
    <MDXEditor />
  </Collapse>
);
