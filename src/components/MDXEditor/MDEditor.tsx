import { Editor } from "@bytemd/react";
import { Box } from "@chakra-ui/react";
import { VFC } from "react";
import { uploadImage } from "../../services/uploadImage";
import { loadObject } from "../hooks/slices/FileUploaderSlice";
import { setSource } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useSource } from "../hooks/useMDXEditor";
import "bytemd/dist/index.min.css";
import { usePageName } from "../hooks/usePageMeta";

export const MDEditor: VFC = () => {
  const source = useSource();
  const pageName = usePageName();
  const dispatch = useDispatch();
  return (
    <Box className="container" h={"lg"} sx={{ ".bytemd": { height: "lg" } }}>
      <Editor
        value={source}
        onChange={(e) => dispatch(setSource(`${e}`))}
        uploadImages={async (files) => {
          const [file] = files;
          if (!file) return [];
          const key = await uploadImage(file, pageName);
          if (!key) return [];
          dispatch(loadObject());
          return [{ url: key }];
        }}
      />
    </Box>
  );
};
