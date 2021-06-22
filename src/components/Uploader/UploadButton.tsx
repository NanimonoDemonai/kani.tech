import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { VFC } from "react";
import { uploadFile } from "../hooks/slices/FileUploaderSlice";
import { useDispatch } from "../hooks/store";
import { useIsDisabling } from "../hooks/useUploader";

export const UploadButton: VFC<{
  files: File[];
  setFiles: (array: []) => void;
}> = ({ files, setFiles }) => {
  const dispatch = useDispatch();
  const disabled = useIsDisabling();

  return (
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
  );
};
