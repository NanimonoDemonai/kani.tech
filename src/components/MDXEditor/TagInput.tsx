import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { VFC } from "react";
import { setTags } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useTags } from "../hooks/useMDXEditor";
import { useTagInput } from "./hooks/useTagInput";

export const TagInput: VFC = () => {
  const dispatch = useDispatch();
  const tags = useTags();
  const { onRemoveTag, onKeyPress, value, onChange } = useTagInput();

  return (
    <Box>
      <HStack spacing={2}>
        <Text style={{ whiteSpace: "nowrap" }} fontSize="xs">
          タグ
        </Text>
        {tags.map((e) => (
          <Button
            size="xs"
            rightIcon={<CloseIcon boxSize={2} />}
            key={e}
            onClick={() => {
              dispatch(setTags(tags.filter((f) => f !== e)));
            }}
          >
            {e}
          </Button>
        ))}
      </HStack>
      <InputGroup size="md">
        <Input
          value={value}
          onChange={onChange}
          placeholder="タグ入力"
          onKeyPress={onKeyPress}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" mr={1} px={3} onClick={onRemoveTag}>
            タグを追加
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
