import { VFC } from "react";
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
import axios from "axios";
import { useRecoilValue } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";

export const ImageUploader: VFC = () => {
  const pageMeta = useRecoilValue(pageMetaAtoms);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: "image/*",
      maxFiles: 1,
    });
  const [getUrl, {}] = useGetUploadUrlLazyQuery({
    onCompleted: (data) => {
      const { getUploadUrl } = data;
      if (getUploadUrl) {
        axios.put(
          getUploadUrl,
          {
            data: acceptedFiles[0],
          },
          { headers: { "Content-Type": acceptedFiles[0].type } }
        );
      }
    },
  });
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
          {acceptedFiles.map((file) => (
            <img src={URL.createObjectURL(file)} alt="image preview" />
          ))}
        </Box>
        <Spacer />
        <Button
          disabled={acceptedFiles.length < 1}
          onClick={() =>
            getUrl({
              variables: {
                contentType: acceptedFiles[0].type,
                key: `${pageMeta?.title}/${acceptedFiles[0].name}`,
              },
            })
          }
        >
          アップロード
        </Button>
      </Flex>
    </Stack>
  );
};
