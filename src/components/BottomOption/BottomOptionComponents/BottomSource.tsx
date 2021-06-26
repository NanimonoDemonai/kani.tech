import { Collapse } from "@chakra-ui/react";
import { useEffect, useState, VFC } from "react";
import { Fallback } from "../../Elements/Fallback";
import { useSource } from "../../hooks/usePageMeta";
import { useIsBottomOptionShowSource } from "../../hooks/usePageOption";
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";

export const BottomSource: VFC = () => {
  const isBottomOptionShowSource = useIsBottomOptionShowSource();
  const source = useSource();

  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (isBottomOptionShowSource) setInitialized(true);
  }, [isBottomOptionShowSource]);

  return (
    <Collapse in={isBottomOptionShowSource} animateOpacity>
      {initialized ? (
        <DynamicSourceHighlighter source={source} />
      ) : (
        <Fallback />
      )}
    </Collapse>
  );
};
