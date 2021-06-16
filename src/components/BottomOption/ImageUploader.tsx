import { VFC } from "react";
import { Stack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import useAxios from "axios-hooks";
import { ObjectList } from "./ObjectList";
import { ImageUploaderDropzone } from "./ImageUploaderDropzone";

export const ImageUploader: VFC = () => {
  const pageMeta = useRecoilValue(pageMetaAtoms);
  const [{ loading }, refetch] = useAxios({}, { manual: true });

  const pageName = pageMeta?.pageName;
  return (
    <Stack spacing={3}>
      {pageName && <ObjectList pageName={pageName} loading={loading} />}
      <ImageUploaderDropzone refetch={refetch} loading={loading} />
    </Stack>
  );
};
