import { promises as fs } from "fs";

export const readFileWithModifiedTime = async (
  path: string
): Promise<{ src: string; modified: string }> => {
  const { mtime } = await fs.stat(path);
  const src = await fs.readFile(path, {
    encoding: "utf8",
  });
  return { src, modified: mtime.toJSON() };
};
