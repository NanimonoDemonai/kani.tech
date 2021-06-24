import { Button } from "@chakra-ui/react";
import { VFC } from "react";
import { deleteFile } from "../hooks/slices/FileUploaderSlice";
import { useDispatch } from "../hooks/store";
import { useIsDisabling, useLoading } from "../hooks/useUploader";

export const DeleteButton: VFC<{ objectKey: string }> = ({ objectKey }) => {
  const dispatch = useDispatch();
  const disabled = useIsDisabling();
  const loading = useLoading();

  return (
    <Button
      disabled={disabled || loading}
      onClick={() => {
        dispatch(deleteFile({ key: objectKey }));
      }}
    >
      削除
    </Button>
  );
};
