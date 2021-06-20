import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState, VFC } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../hooks/slices/FileUploaderSlice";
import { useDispatch } from "../hooks/store";
import { useIsDisabling } from "../hooks/useUploader";

export const ImageUploaderDropzone: VFC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useDispatch();
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
          disabled={files.length < 1 || disabled}
          onClick={() => {
            dispatch(uploadFile({ file: files[0] }));
            setFiles([]);
          }}
        >
          アップロード
        </Button>
      </Flex>
    </Stack>
  );
};
