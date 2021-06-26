import { useSelector } from "./store";
import { PageOptionState } from "./types";

export const usePageOption = (): PageOptionState =>
  useSelector((state) => state.pageOption);

export const useIsBottomOptionFileListEditor = (): boolean =>
  useSelector((state) => state.pageOption.isBottomOptionFileListEditor);

export const useIsBottomOptionShowHistory = (): boolean =>
  useSelector((state) => state.pageOption.isBottomOptionShowHistory);

export const useIsBottomOptionShowSource = (): boolean =>
  useSelector((state) => state.pageOption.isBottomOptionShowSource);
