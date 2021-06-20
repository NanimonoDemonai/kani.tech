import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { VFC } from "react";
import { setTitle } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useTitle } from "../hooks/useMDXEditor";

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
