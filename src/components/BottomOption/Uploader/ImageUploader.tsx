import { VFC } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { pageMetaAtoms } from "../../hooks/atoms/pageMetaAtoms";
import useAxios from "axios-hooks";
import { ObjectList } from "../ObjectList";
import { ImageUploaderDropzone } from "./ImageUploaderDropzone";

export const ImageUploader: VFC = () => {
  const pageMeta = useRecoilValue(pageMetaAtoms);
  const [{ loading }, refetch] = useAxios({}, { manual: true });

  const pageName = pageMeta?.pageName;
  return (
    <Stack spacing={3}>
      <Text fontSize="2xl">ファイル一覧</Text>
      {pageName && <ObjectList pageName={pageName} loading={loading} />}{" "}
      <Text fontSize="2xl">アップロード</Text>
      <ImageUploaderDropzone refetch={refetch} loading={loading} />
    </Stack>
  );
};
