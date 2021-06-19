import { VFC } from "react";
import { DateTime } from "../Elements/DateTime";
import { useModified } from "../hooks/usePageMeta";

export const PageModified: VFC = () => {
  const modified = useModified();
  return modified ? <DateTime date={modified} label={"更新日"} /> : null;
};
