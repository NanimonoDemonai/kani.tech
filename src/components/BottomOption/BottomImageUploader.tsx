import { VFC } from "react";
import { Collapse } from "@chakra-ui/react";
import { useIsBottomOptionFileListEditor } from "../hooks/usePageOption";
import dynamic from "next/dynamic";

const DynamicImageUploader = dynamic<{}>(() =>
  import("../Uploader/ImageUploader").then((mod) => mod.ImageUploader)
);

export const BottomImageUploader: VFC = () => {
  const isBottomOptionFileListEditor = useIsBottomOptionFileListEditor();
  return (
    <Collapse in={isBottomOptionFileListEditor} animateOpacity>
      <DynamicImageUploader />
    </Collapse>
  );
};
