import { VFC } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { pageMetaAtoms } from "../../hooks/atoms/pageMetaAtoms";
import { ObjectList } from "../ObjectList";
import { ImageUploaderDropzone } from "./ImageUploaderDropzone";
import { useAsyncCallback } from "react-async-hook";
import { gqlClient } from "../../../services/client/graphqlRequest";
import axios from "axios";

export const ImageUploader: VFC = () => {
  const pageMeta = useRecoilValue(pageMetaAtoms);
  const { execute, loading } = useAsyncCallback<void, [File]>(async (file) => {
    const pageName = pageMeta?.pageName;
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
  const pageName = pageMeta?.pageName;

  return (
    <Stack spacing={3}>
      <Text fontSize="2xl">ファイル一覧</Text>
      {pageName && <ObjectList pageName={pageName} loading={loading} />}
      <Text fontSize="2xl">アップロード</Text>
      <ImageUploaderDropzone execute={execute} loading={loading} />
    </Stack>
  );
};
