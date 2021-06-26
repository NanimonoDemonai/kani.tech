import { Button } from "@chakra-ui/react";
import { VFC } from "react";
import { submitPage } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useDisabled } from "../hooks/useMDXEditor";

export const SubmitButton: VFC<{ pageName: string }> = ({ pageName }) => {
  const dispatch = useDispatch();
  const disabled = useDisabled();
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
