import { ImageObject } from "../../types/PageMeta";
import { useSelector } from "./store";

export const useLoading = (): boolean =>
  useSelector((state) => state.Uploader?.loading || true);

export const useIsDisabling = (): boolean =>
  useSelector((state) =>
    state.Uploader
      ? state.Uploader.uploading ||
        state.Uploader.deleting ||
        state.Uploader.loading
      : true
  );

export const useObjectList = (): ImageObject[] =>
  useSelector((state) => state.Uploader?.objectList || []);
