import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageMetaAtoms } from "../../../hooks/atoms/pageMetaAtoms";
import {
  MDXSourceInputAtoms,
  MDXTagsInputAtoms,
  MDXTitleInputAtoms,
} from "./atoms";

export const useSetMDXEditorAtomsEffect = (): void => {
  const pageMeta = useRecoilValue(pageMetaAtoms);

  const setTileInput = useSetRecoilState(MDXTitleInputAtoms);
  const setSourceInput = useSetRecoilState(MDXSourceInputAtoms);
  const setTags = useSetRecoilState(MDXTagsInputAtoms);
  useEffect(() => {
    setTileInput(pageMeta?.title || "");
    setSourceInput(pageMeta?.source || "");
    setTags(pageMeta?.tags || []);
  }, [setTileInput, setSourceInput, setTags, pageMeta]);
};
