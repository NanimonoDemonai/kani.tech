import { EditorProps } from "@bytemd/react";
import { VFC, Suspense, lazy } from "react";
import { Fallback } from "../Elements/Fallback";

const LazyComponent = lazy(() => import("./LazyLoadEditorWrapper"));

export const LazyLoadEditor: VFC<EditorProps> = (props) => (
  <Suspense fallback={<Fallback />}>
    <LazyComponent {...props} />
  </Suspense>
);
