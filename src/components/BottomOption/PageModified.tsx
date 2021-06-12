import { VFC } from "react";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { DateTime } from "../Elements/DateTime";

export const PageModified: VFC = () => {
  const [pageMeta] = useRecoilState(pageMetaAtoms);
  return pageMeta ? (
    <DateTime date={pageMeta.modified} label={"更新日"} />
  ) : null;
};
