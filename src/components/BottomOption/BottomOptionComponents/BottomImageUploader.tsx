import { Collapse } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { VFC } from "react";
import { useIsBottomOptionFileListEditor } from "../../hooks/usePageOption";

const DynamicImageUploader = dynamic<unknown>(() =>
  import("../../Uploader/ImageUploader").then((mod) => mod.ImageUploader)
);

export const BottomImageUploader: VFC = () => {
  const isBottomOptionFileListEditor = useIsBottomOptionFileListEditor();
  return (
    <Collapse in={isBottomOptionFileListEditor} animateOpacity>
      <DynamicImageUploader />
    </Collapse>
  );
};
