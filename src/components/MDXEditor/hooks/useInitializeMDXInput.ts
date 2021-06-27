import { useEffect } from "react";
import { setMDXInput } from "../../hooks/slices/MDXInputSlice";
import { useDispatch } from "../../hooks/store";
import { useIsInitialized } from "../../hooks/useMDXEditor";
import { usePageMeta } from "../../hooks/usePageMeta";
import { usePageOption } from "../../hooks/usePageOption";

export const useInitializeMDXInput = (): void => {
  const pageMeta = usePageMeta();
  const dispatch = useDispatch();
  const initialized = useIsInitialized();
  const pageOption = usePageOption();
  useEffect(() => {
    if (pageOption.isBottomOptionShowEditor && !initialized) {
      dispatch(setMDXInput(pageMeta));
    }
  }, [dispatch, pageMeta, pageOption, initialized]);
};
