import { Editor } from "@bytemd/react";
import { Box } from "@chakra-ui/react";
import { useCallback, VFC } from "react";
import { uploadFile } from "../hooks/slices/FileUploaderSlice";
import { setSource } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useSource } from "../hooks/useMDXEditor";
import "bytemd/dist/index.min.css";
import { usePageName } from "../hooks/usePageMeta";

export const MDEditor: VFC = () => {
  const source = useSource();
  const pageName = usePageName();
  const dispatch = useDispatch();
  const uploadImages = useCallback<
    (files: File[]) => Promise<[{ url: string }] | []>
  >(
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
  return (
    <Box className="container" h={"lg"} sx={{ ".bytemd": { height: "lg" } }}>
      <Editor
        value={source}
        onChange={(e) => dispatch(setSource(`${e}`))}
        uploadImages={uploadImages}
      />
    </Box>
  );
};
