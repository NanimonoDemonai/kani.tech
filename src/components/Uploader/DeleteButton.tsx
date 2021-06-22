import { Button } from "@chakra-ui/react";
import { VFC } from "react";
import { deleteFile } from "../hooks/slices/FileUploaderSlice";
import { useDispatch } from "../hooks/store";
import { useIsDisabling, useLoading } from "../hooks/useUploader";

export const DeleteButton: VFC<{ key: string }> = ({ key }) => {
  const dispatch = useDispatch();
  const disabled = useIsDisabling();
  const loading = useLoading();

  return (
    <Button
      disabled={disabled || loading}
      onClick={() => {
        dispatch(deleteFile({ key }));
      }}
    >
      削除
    </Button>
  );
};
