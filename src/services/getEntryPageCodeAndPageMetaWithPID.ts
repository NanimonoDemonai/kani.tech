import { PageMeta } from "../types/PageMeta";
import { readFileWithModifiedTime } from "../utils/readFileWithModifiedTime";
import { sourceParser } from "../utils/parsers/sourceParser";
import { getOrSetMDXCompileCache } from "./caches/MDXCompileCache";

interface Res {
  code: string;
  pageMeta: PageMeta;
}

const setter = (src: string, modified: string) => async (): Promise<Res> => {
  const { code, frontMatter } = await sourceParser(src);
  return { code, pageMeta: { modified, ...frontMatter } };
};
export const getEntryPageCodeAndPageMetaWithPID = async (
  pid: string
): Promise<Res | undefined> => {
  const { src, modified } = await readFileWithModifiedTime(pid);
  return await getOrSetMDXCompileCache(pid, modified, setter(src, modified));
};
