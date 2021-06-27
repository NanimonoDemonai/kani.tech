import { useSelector } from "./store";
import { EntryPreviewState } from "./types";

export const useIsLoading = (): boolean =>
  useSelector((state) => state.Preview?.loading ?? false);
export const usePreview = (): EntryPreviewState | undefined =>
  useSelector((state) => state.Preview);
