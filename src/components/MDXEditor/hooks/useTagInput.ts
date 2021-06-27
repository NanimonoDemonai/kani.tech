import { ComponentProps, useCallback, useState } from "react";
import { setTags } from "../../hooks/slices/MDXInputSlice";
import { useDispatch } from "../../hooks/store";
import { useTags } from "../../hooks/useMDXEditor";

interface Hooks {
  value: string;
  onRemoveTag: () => void;
  onKeyPress: ComponentProps<"input">["onKeyPress"];
  onChange: ComponentProps<"input">["onChange"];
}
export const useTagInput = (): Hooks => {
  const dispatch = useDispatch();

  const tags = useTags();
  const [tagInput, setTagInput] = useState("");
  const onRemoveTag = useCallback(() => {
    if (tagInput.length <= 0) return;
    dispatch(setTags([...new Set([...tags, tagInput])]));
    setTagInput("");
  }, [setTagInput, tagInput, tags, dispatch]);
  const onKeyPress = useCallback(
    (e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        if (tagInput.length <= 0) return;
        dispatch(setTags([...new Set([...tags, tagInput])]));
        setTagInput("");
      }
    },
    [dispatch, tagInput, setTagInput, tags]
  );
  const onChange = useCallback(
    (e) => setTagInput(e.target.value),
    [setTagInput]
  );
  return { onRemoveTag, onKeyPress, value: tagInput, onChange };
};
