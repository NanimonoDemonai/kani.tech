import { VFC } from "react";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { DateTime } from "../Elements/DateTime";
import { Box } from "@chakra-ui/react";

export const PageRevision: VFC = () => {
  const [pageMeta] = useRecoilState(pageMetaAtoms);
  return pageMeta?.revision ? (
    <Box textAlign="right">
      <DateTime date={pageMeta.revision} label={"revision"} />
    </Box>
  ) : null;
};
