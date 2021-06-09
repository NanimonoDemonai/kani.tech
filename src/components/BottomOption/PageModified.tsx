import { VFC } from "react";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { DateTime } from "../Elements/DateTime";
import { Box } from "@chakra-ui/react";

export const PageModified: VFC = () => {
  const [pageMeta] = useRecoilState(pageMetaAtoms);
  return pageMeta ? (
    <Box textAlign="right">
      <DateTime date={pageMeta.modified} label={"更新日"} />
    </Box>
  ) : null;
};
