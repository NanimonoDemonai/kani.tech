import { Button } from "@chakra-ui/react";
import { VFC } from "react";
import { submitPage } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useDisabled } from "../hooks/useMDXEditor";
import { usePageName } from "../hooks/usePageMeta";

export const SubmitButton: VFC = () => {
  const dispatch = useDispatch();
  const disabled = useDisabled();
  const pageName = usePageName();

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
