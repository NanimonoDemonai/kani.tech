import { useSelector } from "./store";
import { EntryPreviewState } from "./types";

export const useIsInitialized = (): boolean =>
  useSelector((state) => !!state.Preview);
export const usePreview = (): EntryPreviewState | undefined =>
  useSelector((state) => state.Preview);
