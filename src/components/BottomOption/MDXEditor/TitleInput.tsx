import { VFC } from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useTitle } from "../../hooks/useMDXEditor";
import { useDispatch } from "../../hooks/store";
import { setTitle } from "../../hooks/slices/MDXInputSlice";

export const TitleInput: VFC = () => {
  const title = useTitle();
  const dispatch = useDispatch();
  return (
    <InputGroup>
      <InputLeftAddon>タイトル</InputLeftAddon>
      <Input
        placeholder="タイトル"
        value={title}
        onChange={(e) => {
          dispatch(setTitle(e.target.value));
        }}
      />
    </InputGroup>
  );
};
