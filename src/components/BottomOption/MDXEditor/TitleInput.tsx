import { VFC } from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

interface Props {
  title: string;
  setTitle: (str: string) => void;
}

export const TitleInput: VFC<Props> = ({ title, setTitle }) => (
  <InputGroup>
    <InputLeftAddon children="タイトル" />
    <Input
      placeholder="タイトル"
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
    />
  </InputGroup>
);
