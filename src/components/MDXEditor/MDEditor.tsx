import breaks from "@bytemd/plugin-breaks";
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/react";
import { Box } from "@chakra-ui/react";
import { VFC } from "react";
import { Fallback } from "../Elements/Fallback";
import { setSource } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useIsInitialized, useSource } from "../hooks/useMDXEditor";
import "bytemd/dist/index.min.css";
import { useInitializeMDXInput } from "./hooks/useInitializeMDXInput";
import { useUploadImages } from "./hooks/useUploadImages";

export const MDEditor: VFC = () => {
  const source = useSource();
  const dispatch = useDispatch();
  const initialized = useIsInitialized();
  const uploadImages = useUploadImages();
  useInitializeMDXInput();

  return (
    <Box className="container" h={"lg"} sx={{ ".bytemd": { height: "lg" } }}>
      {initialized ? (
        <Editor
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
