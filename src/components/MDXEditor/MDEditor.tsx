import { Editor } from "@bytemd/react";
import { Box } from "@chakra-ui/react";
import { VFC } from "react";
import { setSource } from "../hooks/slices/MDXInputSlice";
import { useDispatch } from "../hooks/store";
import { useSource } from "../hooks/useMDXEditor";
import "bytemd/dist/index.min.css";

export const MDEditor: VFC = () => {
  const source = useSource();
  const dispatch = useDispatch();
  return (
    <Box className="container" h={"lg"} sx={{ ".bytemd": { height: "lg" } }}>
      <Editor
        value={source}
        onChange={(e) => dispatch(setSource(`${e}`))}
        mode={"tab"}
      />
    </Box>
  );
};
