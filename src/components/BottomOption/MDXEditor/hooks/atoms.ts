import { atom } from "recoil";

export const MDXTitleInputAtoms = atom<string>({
  key: "MDXEditor/TitleInput",
  default: "",
});
