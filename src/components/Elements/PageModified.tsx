import { VFC } from "react";
import { useModified } from "../hooks/usePageMeta";
import { DateTime } from "./DateTime";

export const PageModified: VFC = () => {
  const modified = useModified();
  return modified ? <DateTime date={modified} label={"更新日"} /> : null;
};
