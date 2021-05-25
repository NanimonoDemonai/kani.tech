import { getFilesByGlob } from "../utils/getFilesByGlob";
import path from "path";

export const getEntryPagePathList = (): Promise<string[]> =>
  getFilesByGlob("./src/entries/*.mdx");
export const getEntryPageList = async (): Promise<string[]> =>
  (await getEntryPagePathList()).map((e) => path.basename(e, ".mdx"));
