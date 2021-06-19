import { useCallback, useState, VFC } from "react";
import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

interface Props {
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  execute: (file: File) => Promise<void>;
}

export const ImageUploaderDropzone: VFC<Props> = ({ execute, loading }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: (e) => {
      setFiles(e);
    },
    accept: "image/*",
    maxFiles: 1,
  });
  const onClick = useCallback(() => {
    execute(files[0]).then(() => {
      /* noop */
    });
    setFiles([]);
  }, [files, execute]);

  return (
    <Box>
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
        <Button disabled={files.length < 1 || loading} onClick={onClick}>
          アップロード
        </Button>
      </Flex>
    </Box>
  );
};
