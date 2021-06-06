import { PageMeta } from "../types/PageMeta";
import { readFileWithModifiedTime } from "../utils/readFileWithModifiedTime";
import { sourceParser } from "../utils/parsers/sourceParser";

interface Res {
  source: string;
  pageMeta: PageMeta;
}

export const getMDXSourcePageCodeAndPageMetaWithPID = async (
  pid: string
): Promise<Res> => {
  const { src, modified } = await readFileWithModifiedTime(pid);
  const { frontMatter } = await sourceParser(src);
  return { source: src, pageMeta: { modified, ...frontMatter } };
};
