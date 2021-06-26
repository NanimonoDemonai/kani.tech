import { VFC } from "react";
import { useIsBottomOptionShowSource } from "../../hooks/usePageOption";
import { DynamicCollapse } from "./DynamicCollapse";
import { DynamicSourceHighlighter } from "./DynamicSourceHighlighter";

export const BottomSource: VFC = () => {
  const isBottomOptionShowSource = useIsBottomOptionShowSource();

  return (
    <DynamicCollapse
      isOpen={isBottomOptionShowSource}
      Render={DynamicSourceHighlighter}
    />
  );
};
