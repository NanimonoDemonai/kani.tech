import { useState, VFC } from "react";
import { useDropzone } from "react-dropzone";
import { useGetUploadUrlLazyQuery } from "../../services/client/generated/graphqlCodeGen";
import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import useAxios from "axios-hooks";
import { ObjectList } from "./ObjectList";

export const ImageUploader: VFC = () => {
  const pageMeta = useRecoilValue(pageMetaAtoms);
  const [files, setFiles] = useState<File[]>([]);
  const [{ loading }, refetch] = useAxios({}, { manual: true });
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropAccepted: (e) => {
        setFiles(e);
      },
      accept: "image/*",
      maxFiles: 1,
    });
  const [getUrl, {}] = useGetUploadUrlLazyQuery({
    onCompleted: async (data) => {
      const { getUploadUrl } = data;
      if (getUploadUrl) {
        await refetch({
          method: "put",
          url: getUploadUrl,
          data: acceptedFiles[0],

          headers: { "Content-Type": acceptedFiles[0].type },
        });
        setFiles([]);
      }
    },
  });
  const pageName = pageMeta?.pageName;
  return (
    <Stack spacing={3}>
      <Text size="md">アップロード</Text>
      <Box
        {...getRootProps()}
        h={20}
        p="6"
        rounded="md"
        border="1px"
        borderColor="gray.200"
      >
        <input {...getInputProps()} />
        <Center>
          <Text color="gray.500">
            {isDragActive ? "アップロード" : "DnDでアップロード"}
          </Text>
        </Center>
      </Box>
      <Flex>
        <Box h={20}>
          {files.map((file) => (
            <img
              src={URL.createObjectURL(file)}
              alt="image preview"
              style={{ width: 30, height: "auto" }}
            />
          ))}
        </Box>
        <Spacer />
        <Button
          disabled={files.length < 1 || loading}
          onClick={() =>
            getUrl({
              variables: {
                contentType: files[0].type,
                key: `${pageName}/${files[0].name}`,
              },
            })
          }
        >
          アップロード
        </Button>
      </Flex>
      {pageName && <ObjectList pageName={pageName} loading={loading} />}
    </Stack>
  );
};
