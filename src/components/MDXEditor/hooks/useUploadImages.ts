import { useCallback } from "react";
import { uploadFile } from "../../hooks/slices/FileUploaderSlice";
import { useDispatch } from "../../hooks/store";
import { usePageName } from "../../hooks/usePageMeta";

type fileUploaderType = (files: File[]) => Promise<[{ url: string }] | []>;

export const useUploadImages = (): fileUploaderType => {
  const dispatch = useDispatch();
  const pageName = usePageName();

  return useCallback<fileUploaderType>(
    async (files) => {
      const [file] = files;
      if (!file) return [];
      return new Promise<[{ url: string }]>((resolve, reject) => {
        dispatch(uploadFile({ file: files[0] }))
          .then(() => {
            resolve([{ url: `${pageName}/${file.name}` }]);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    [dispatch, pageName]
  );
};
