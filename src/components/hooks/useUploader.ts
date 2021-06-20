import { useSelector } from "./store";

export const useLoading = (): boolean =>
  useSelector((state) => state.Uploader.loading);

export const useIsDisabling = (): boolean =>
  useSelector(
    (state) =>
      state.Uploader.uploading ||
      state.Uploader.deleting ||
      state.Uploader.loading
  );

export const useObjectList = (): string[] =>
  useSelector((state) => state.Uploader.objectList);
