import { VFC } from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { MDXTitleInputAtoms } from "./hooks/atoms";

export const TitleInput: VFC = () => {
  const [title, setTitle] = useRecoilState(MDXTitleInputAtoms);
  return (
    <InputGroup>
      <InputLeftAddon>タイトル</InputLeftAddon>
      <Input
        placeholder="タイトル"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
    </InputGroup>
  );
};
