import { atom } from "recoil";
import { PageMeta } from "../../../types/PageMeta";

export const pageMetaAtoms = atom<PageMeta | undefined>({
  key: "BlogMeta",
  default: undefined,
});
