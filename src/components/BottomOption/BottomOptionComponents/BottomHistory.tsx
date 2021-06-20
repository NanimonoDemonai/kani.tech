import { Collapse } from "@chakra-ui/react";
import { VFC } from "react";
import { useIsBottomOptionShowHistory } from "../../hooks/usePageOption";
import { RevisionTable } from "./RevisionTable";

export const BottomHistory: VFC = () => {
  const isBottomOptionShowHistory = useIsBottomOptionShowHistory();
  return (
    <Collapse in={isBottomOptionShowHistory} animateOpacity>
      <RevisionTable />
    </Collapse>
  );
};
