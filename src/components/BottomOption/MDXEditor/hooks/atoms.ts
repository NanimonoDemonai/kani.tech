import { atom } from "recoil";

export const MDXTitleInputAtoms = atom<string>({
  key: "MDXEditor/TitleInput",
  default: "",
});

export const MDXTagsInputAtoms = atom<string[]>({
  key: "MDXEditor/MDXTagsInput",
  default: [],
});
