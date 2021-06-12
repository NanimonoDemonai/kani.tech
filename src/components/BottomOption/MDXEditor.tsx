import { useCallback, useState, VFC } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import { extractContent } from "../../utils/extractContent";
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";
import { usePostArticleMutation } from "../../services/client/generated/graphqlCodeGen";
import { CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export const MDXEditor: VFC = () => {
  const router = useRouter();

  const pageMeta = useRecoilState(pageMetaAtoms)[0];
  const [value, setValue] = useState<string | undefined>(
    extractContent(pageMeta?.source)
  );
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(pageMeta?.tags || []);
  const [title, setTitle] = useState<string>(pageMeta?.title || "");
  const [postArticle, { loading, error }] = usePostArticleMutation({
    onCompleted: () => {
      router.reload();
    },
  });
  const onPost = useCallback(() => {
    postArticle({
      variables: {
        pageName: pageMeta?.pageName || "",
        pageTitle: title || "",
        source: value || "",
        tags,
      },
    });
  }, [title, value, tags, pageMeta]);
  const onRemoveTag = useCallback(() => {
    if (tagInput.length <= 0) return;
    setTags([...new Set([...tags, tagInput])]);
    setTagInput("");
  }, [setTags, setTagInput, tagInput, tags]);
  return (
    <Box>
      <Stack spacing={2}>
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

        <Box className="container" h={"lg"}>
          <MDEditor
            value={value}
            onChange={setValue}
            preview={"edit"}
            height={512}
          />
        </Box>
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
      </Stack>
      <Divider my={2} />
      <HStack>
        <Button disabled={loading || !!error} onClick={onPost}>
          投稿
        </Button>
      </HStack>
    </Box>
  );
};
