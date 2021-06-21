import { Button } from "@chakra-ui/react";
import { VFC } from "react";
import { submitPage } from "../hooks/slices/MDXInputSlice";
import { useDispatch, useSelector } from "../hooks/store";

export const SubmitButton: VFC<{ pageName: string }> = ({ pageName }) => {
  const dispatch = useDispatch();
  const disabled = useSelector((state) => state.MDXInput.loading);
  return (
    <Button
      disabled={disabled}
      onClick={() => {
        dispatch(submitPage({ pageName }));
      }}
    >
      投稿
    </Button>
  );
};
