import breaks from "@bytemd/plugin-breaks";
import gfm from "@bytemd/plugin-gfm";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, VFC } from "react";
import { Fallback } from "../Elements/Fallback";
import { LazyLoadEditor } from "../LazyComponent/LazyLoadEditor";
import { uploadFile } from "../hooks/slices/FileUploaderSlice";
import { setMDXInput, setSource } from "../hooks/slices/MDXInputSlice";
import { useDispatch, useSelector } from "../hooks/store";
import { useSource } from "../hooks/useMDXEditor";
import "bytemd/dist/index.min.css";
import { usePageMeta, usePageName } from "../hooks/usePageMeta";
import { usePageOption } from "../hooks/usePageOption";

export const MDEditor: VFC = () => {
  const pageMeta = usePageMeta();
  const source = useSource();
  const pageName = usePageName();
  const dispatch = useDispatch();
  const pageOption = usePageOption();
  const initialized = useSelector((state) => state.MDXInput?.initialized);
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
  useEffect(() => {
    if (pageOption.isBottomOptionShowEditor && !initialized) {
      dispatch(setMDXInput(pageMeta));
    }
  }, [dispatch, pageMeta, pageOption, initialized]);

  return (
    <Box className="container" h={"lg"} sx={{ ".bytemd": { height: "lg" } }}>
      {initialized ? (
        <LazyLoadEditor
          value={source}
          plugins={[breaks(), gfm()]}
          onChange={(e) => dispatch(setSource(`${e}`))}
          uploadImages={uploadImages}
        />
      ) : (
        <Fallback />
      )}
    </Box>
  );
};
