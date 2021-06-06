import { promises as fs } from "fs";

export const readFileWithModifiedTime = async (
  pid: string
): Promise<{ src: string; modified: string }> => {
  const path = `./src/entries/${pid}.mdx`;
  const { mtime } = await fs.stat(path);
  const src = await fs.readFile(path, {
    encoding: "utf8",
  });
  return { src, modified: mtime.toJSON() };
};
