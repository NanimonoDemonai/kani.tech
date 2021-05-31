import path from "path";
import { getFilesByGlob } from "../utils/getFilesByGlob";

export const getEntryPagePathList = (): Promise<string[]> =>
  getFilesByGlob("./src/entries/*.mdx");
export const getEntryPageList = async (): Promise<string[]> =>
  (await getEntryPagePathList()).map((e) => path.basename(e, ".mdx"));
