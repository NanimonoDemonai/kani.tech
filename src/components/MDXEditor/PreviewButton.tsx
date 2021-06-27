import { Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState, VFC } from "react";
import { useSource } from "../hooks/useMDXEditor";
const DynamicPreviewRender = dynamic<{ source: string }>(
  () => import("./PreviewRender").then((mod) => mod.PreviewRender),
  { ssr: false }
);

export const PreviewButton: VFC = () => {
  const [initialized, setInitialized] = useState(false);
  const [targetSource, setTargetSource] = useState("");
  const source = useSource();
  return (
    <>
      <Button
        onClick={() => {
          setInitialized(true);
          setTargetSource(source);
        }}
      >
        プレビュー
      </Button>
      {initialized && <DynamicPreviewRender source={targetSource} />}
    </>
  );
};
