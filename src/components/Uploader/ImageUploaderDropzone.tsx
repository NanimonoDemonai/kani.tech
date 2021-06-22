import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { useState, VFC } from "react";
import { useDropzone } from "react-dropzone";
import { useIsDisabling } from "../hooks/useUploader";
import { UploadButton } from "./UploadButton";

export const ImageUploaderDropzone: VFC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const disabled = useIsDisabling();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: (e) => {
      setFiles(e);
    },
    accept: "image/*",
    maxFiles: 1,
    disabled,
  });
  return (
    <Stack spacing={2}>
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
      <UploadButton files={files} setFiles={setFiles} />
    </Stack>
  );
};
