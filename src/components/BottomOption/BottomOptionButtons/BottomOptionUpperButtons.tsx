import { VFC } from "react";
import { BottomOptionToggleButton } from "./BottomOptionToggleButton";
import {
  toggleBottomOptionShow,
  toggleBottomOptionShowEditor,
} from "../../hooks/slices/pageOptionSlice";
import { useDispatch } from "../../hooks/store";
import { usePageOption } from "../../hooks/usePageOption";
import { useEditorIsShown } from "../hooks/useEditorIsShown";

export const BottomOptionUpperButtons: VFC = () => {
  const dispatch = useDispatch();
  const pageOption = usePageOption();
  const editorIsShown = useEditorIsShown();

  return (
    <>
      <BottomOptionToggleButton
        onToggle={() => dispatch(toggleBottomOptionShow())}
        isOpen={pageOption.isBottomOptionShow}
        label={"オプション"}
      />
      {editorIsShown && (
        <BottomOptionToggleButton
          onToggle={() => {
            dispatch(toggleBottomOptionShowEditor());
          }}
          isOpen={pageOption.isBottomOptionShowEditor}
          label={"編集する"}
        />
      )}
    </>
  );
};
