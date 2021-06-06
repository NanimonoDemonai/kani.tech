import { getFilesByGlob } from "../utils/getFilesByGlob";

export const getEntryPagePathList = (): Promise<string[]> =>
  getFilesByGlob("./src/entries/*.mdx");
