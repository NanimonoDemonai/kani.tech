import { atom } from "recoil";

export const MDXTitleInputAtoms = atom<string>({
  key: "MDXEditor/TitleInput",
  default: "",
});

export const MDXSourceInputAtoms = atom<string>({
  key: "MDXEditor/SourceInput",
  default: "",
});

export const MDXTagsInputAtoms = atom<string[]>({
  key: "MDXEditor/MDXTagsInput",
  default: [],
});