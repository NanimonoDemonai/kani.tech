import { VFC } from "react";
import { Text } from "@chakra-ui/react";
import { useRevision } from "../hooks/usePageMeta";

export const PageRevision: VFC = () => {
  const revision = useRevision();
  return (
    <>
      revision && (
      <Text color="gray.400" fontSize="sm">
        revision:{revision}
      </Text>
    </>
  );
};
