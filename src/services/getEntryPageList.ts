import { promises as fs } from "fs";
import path from "path";
import { getEntryPagePathList } from "../constants/EntryPageList";

export const getEntryPageList = async (): Promise<
  { pageName: string; modified: string }[]
> => {
  return Promise.all(
    (await getEntryPagePathList()).map(async (e) => {
      return {
        pageName: path.basename(e, ".mdx"),
        modified: (await fs.stat(e)).mtime.toJSON(),
      };
    })
  );
};
