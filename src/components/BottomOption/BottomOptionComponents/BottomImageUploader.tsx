import dynamic from "next/dynamic";
import { VFC } from "react";
import { useIsBottomOptionFileListEditor } from "../../hooks/usePageOption";
import { DynamicCollapse } from "./DynamicCollapse";

const DynamicImageUploader = dynamic<unknown>(
  () => import("../../Uploader/ImageUploader").then((mod) => mod.ImageUploader),
  { ssr: false }
);

export const BottomImageUploader: VFC = () => {
  const isBottomOptionFileListEditor = useIsBottomOptionFileListEditor();
  return (
    <DynamicCollapse
      isOpen={isBottomOptionFileListEditor}
      Render={DynamicImageUploader}
    />
  );
};
