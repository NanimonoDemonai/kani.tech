import { useCallback, useState, VFC } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { MDXTagsInputAtoms } from "./hooks/atoms";

export const TagInput: VFC = () => {
  const [tags, setTags] = useRecoilState(MDXTagsInputAtoms);
  const [tagInput, setTagInput] = useState("");
  const onRemoveTag = useCallback(() => {
    if (tagInput.length <= 0) return;
    setTags([...new Set([...tags, tagInput])]);
    setTagInput("");
  }, [setTags, setTagInput, tagInput, tags]);

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
              setTags(tags.filter((f) => f !== e));
            }}
          >
            {e}
          </Button>
        ))}
      </HStack>
      <InputGroup size="md">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="タグ入力"
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              if (tagInput.length <= 0) return;
              setTags([...new Set([...tags, tagInput])]);
              setTagInput("");
            }
          }}
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
