import { promises as fs } from "fs";
import path from "path";
import { getEntryPagePathList } from "../constants/EntryPageList";

export const getEntryPageList = async (): Promise<
  { pageName: string; modified: string }[]
> => {
  try {
    const entryPagePathList = await getEntryPagePathList();
    const stats = entryPagePathList.map((e) => fs.stat(e));
    const statsList = await Promise.all(stats);
    return entryPagePathList.map((e, i) => ({
      pageName: path.basename(e, ".mdx"),
      modified: statsList[i].mtime.toJSON(),
    }));
  } catch (e) {
    return [];
  }
};
