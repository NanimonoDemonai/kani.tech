import { VFC } from "react";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { Text } from "@chakra-ui/react";

export const PageRevision: VFC = () => {
  const [pageMeta] = useRecoilState(pageMetaAtoms);
  return pageMeta?.revision !== undefined ? (
    <Text color="gray.400" fontSize="sm">
      revision:{pageMeta.revision}
    </Text>
  ) : null;
};
