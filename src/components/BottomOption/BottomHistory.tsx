import { VFC } from "react";
import { Collapse } from "@chakra-ui/react";
import { RevisionTable } from "./RevisionTable";
import { useIsBottomOptionShowHistory } from "../hooks/usePageOption";

export const BottomHistory: VFC = () => {
  const isBottomOptionShowHistory = useIsBottomOptionShowHistory();
  return (
    <Collapse in={isBottomOptionShowHistory} animateOpacity>
      <RevisionTable />
    </Collapse>
  );
};
