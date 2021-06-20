import { Collapse } from "@chakra-ui/react";
import { VFC } from "react";
import { useSource } from "../../hooks/useMDXEditor";
import { useIsBottomOptionShowSource } from "../../hooks/usePageOption";
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";

export const BottomSource: VFC = () => {
  const isBottomOptionShowSource = useIsBottomOptionShowSource();
  const source = useSource();
  return (
    <Collapse in={isBottomOptionShowSource} animateOpacity>
      <DynamicSourceHighlighter source={source} />
    </Collapse>
  );
};
