import { useState, VFC } from "react";
import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useGetUploadUrlLazyQuery } from "../../services/client/generated/graphqlCodeGen";
import { useRecoilValue } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";
import useAxios from "axios-hooks";

interface Props {
  loading: boolean;
  refetch: ReturnType<typeof useAxios>[1];
}

export const ImageUploaderDropzone: VFC<Props> = ({ refetch, loading }) => {
  const pageMeta = useRecoilValue(pageMetaAtoms);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropAccepted: (e) => {
        setFiles(e);
      },
      accept: "image/*",
      maxFiles: 1,
    });
  const [files, setFiles] = useState<File[]>([]);

  const [getUrl] = useGetUploadUrlLazyQuery({
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
    <Box>
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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={file.name}
              src={URL.createObjectURL(file)}
              alt="image preview"
              width={30}
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
    </Box>
  );
};
