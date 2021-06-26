import { Stack, Text } from "@chakra-ui/react";
import { VFC } from "react";
import { uploaderReducer } from "../hooks/slices/FileUploaderSlice";
import { useInjectReducer } from "../hooks/store";
import { useEditorIsShown } from "../hooks/useEditorIsShown";
import { ImageUploaderDropzone } from "./ImageUploaderDropzone";
import { ObjectList } from "./ObjectList";

export const ImageUploader: VFC = () => {
  useInjectReducer({ Uploader: uploaderReducer });

  const editorIsShown = useEditorIsShown();

  return (
    <Stack spacing={3}>
      <Text fontSize="2xl">ファイル一覧</Text>
      <ObjectList />
      {editorIsShown && (
        <>
          <Text fontSize="2xl">アップロード</Text>
          <ImageUploaderDropzone />
        </>
      )}
    </Stack>
  );
};
