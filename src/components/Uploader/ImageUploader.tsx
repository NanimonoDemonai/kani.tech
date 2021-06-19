import { VFC } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { ObjectList } from "./ObjectList";
import { ImageUploaderDropzone } from "./ImageUploaderDropzone";
import { useAsyncCallback } from "react-async-hook";
import { gqlClient } from "../../services/client/graphqlRequest";
import axios from "axios";
import { usePageName } from "../hooks/usePageMeta";
import { useEditorIsShown } from "../BottomOption/hooks/useEditorIsShown";

export const ImageUploader: VFC = () => {
  const editorIsShown = useEditorIsShown();
  const pageName = usePageName();
  const { execute, loading } = useAsyncCallback<void, [File]>(async (file) => {
    const { getUploadUrl: url } = await gqlClient.GetUploadUrl({
      contentType: file.type,
      key: `${pageName}/${file.name}`,
    });
    if (!url) return;
    await axios.request({
      method: "put",
      url,
      data: file,

      headers: { "Content-Type": file.type },
    });
  });

  return (
    <Stack spacing={3}>
      <Text fontSize="2xl">ファイル一覧</Text>
      {pageName && <ObjectList pageName={pageName} loading={loading} />}
      {editorIsShown && (
        <>
          <Text fontSize="2xl">アップロード</Text>
          <ImageUploaderDropzone execute={execute} loading={loading} />
        </>
      )}
    </Stack>
  );
};
