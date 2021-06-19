import { PageOption } from "./slices/pageOptionSlice";
import { useSelector } from "./store";

export const usePageOption = (): PageOption =>
  useSelector((state) => state.pageOption);

export const useIsBottomOptionFileListEditor = (): boolean =>
  useSelector((state) => state.pageOption.isBottomOptionFileListEditor);

export const useIsBottomOptionShowHistory = (): boolean =>
  useSelector((state) => state.pageOption.isBottomOptionShowHistory);

export const useIsBottomOptionShowSource = (): boolean =>
  useSelector((state) => state.pageOption.isBottomOptionShowSource);
