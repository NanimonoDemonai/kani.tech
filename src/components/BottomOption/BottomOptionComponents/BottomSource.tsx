import { VFC } from "react";
import { Collapse } from "@chakra-ui/react";
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";
import { useIsBottomOptionShowSource } from "../../hooks/usePageOption";
import { useSource } from "../../hooks/useMDXEditor";

export const BottomSource: VFC = () => {
  const isBottomOptionShowSource = useIsBottomOptionShowSource();
  const source = useSource();
  return (
    <Collapse in={isBottomOptionShowSource} animateOpacity>
      <DynamicSourceHighlighter source={source} />
    </Collapse>
  );
};
