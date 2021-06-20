import { HStack } from "@chakra-ui/react";
import { VFC } from "react";
import {
  toggleBottomOptionFileListEditor,
  toggleBottomOptionShowHistory,
  toggleBottomOptionShowSource,
} from "../../hooks/slices/pageOptionSlice";
import { useDispatch } from "../../hooks/store";
import { usePageOption } from "../../hooks/usePageOption";
import { BottomOptionToggleButton } from "./BottomOptionToggleButton";

export const BottomOptionBottomButtons: VFC = () => {
  const dispatch = useDispatch();
  const pageOption = usePageOption();

  return (
    <HStack spacing={2}>
      <BottomOptionToggleButton
        onToggle={() => dispatch(toggleBottomOptionShowSource())}
        isOpen={pageOption.isBottomOptionShowSource}
        label={"ソースを表示"}
      />
      <BottomOptionToggleButton
        onToggle={() => dispatch(toggleBottomOptionShowHistory())}
        isOpen={pageOption.isBottomOptionShowHistory}
        label={"履歴を表示"}
      />
      <BottomOptionToggleButton
        onToggle={() => dispatch(toggleBottomOptionFileListEditor())}
        isOpen={pageOption.isBottomOptionFileListEditor}
        label={"ファイルを表示"}
      />
    </HStack>
  );
};
