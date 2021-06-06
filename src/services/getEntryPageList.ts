import path from "path";
import { getEntryPagePathList } from "../constants/EntryPageList";

export const getEntryPageList = async (): Promise<string[]> =>
  (await getEntryPagePathList()).map((e) => path.basename(e, ".mdx"));
