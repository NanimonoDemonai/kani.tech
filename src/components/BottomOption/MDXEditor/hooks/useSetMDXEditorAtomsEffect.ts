import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { usePageMeta } from "../../../hooks/usePageMeta";
import {
  MDXSourceInputAtoms,
  MDXTagsInputAtoms,
  MDXTitleInputAtoms,
} from "./atoms";

export const useSetMDXEditorAtomsEffect = (): void => {
  const pageMeta = usePageMeta();

  const setTileInput = useSetRecoilState(MDXTitleInputAtoms);
  const setSourceInput = useSetRecoilState(MDXSourceInputAtoms);
  const setTags = useSetRecoilState(MDXTagsInputAtoms);
  useEffect(() => {
    setTileInput(pageMeta?.title || "");
    setSourceInput(pageMeta?.source || "");
    setTags(pageMeta?.tags || []);
  }, [setTileInput, setSourceInput, setTags, pageMeta]);
};
