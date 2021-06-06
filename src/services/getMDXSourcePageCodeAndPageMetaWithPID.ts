import { PageMeta } from "../types/PageMeta";
import { sourceParser } from "../utils/parsers/sourceParser";
import { readFileWithModifiedTime } from "../utils/readFileWithModifiedTime";

interface Res {
  pageMeta: PageMeta;
}

export const getMDXSourcePageCodeAndPageMetaWithPID = async (
  pid: string
): Promise<Res> => {
  const { src, modified } = await readFileWithModifiedTime(pid);
  const { frontMatter } = await sourceParser(src);
  return { pageMeta: { modified, ...frontMatter, source: src } };
};
