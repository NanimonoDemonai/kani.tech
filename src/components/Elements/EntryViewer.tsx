import { Box } from "@chakra-ui/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo, VFC } from "react";
import { entryDefaultSX } from "../../styles/entryDefaultSX";
import { ImageObject } from "../../types/PageMeta";
import { ImageComponent } from "../EntryComponents/ImageComponent";

interface Props {
  code: string;
  images: ImageObject[];
}
export const EntryViewer: VFC<Props> = ({ code, images }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <Box sx={entryDefaultSX}>
      <Component components={{ img: ImageComponent(images) }} />
    </Box>
  );
};
