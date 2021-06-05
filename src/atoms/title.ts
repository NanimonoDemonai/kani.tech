import { atom } from "recoil";

export const titleAtoms = atom<string | undefined>({
  key: "BlogTitle",
  default: undefined,
});
