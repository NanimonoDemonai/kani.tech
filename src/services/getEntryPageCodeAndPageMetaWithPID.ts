import { PageMeta } from "../types/PageMeta";
import { sourceParser } from "../utils/parsers/sourceParser";
import { readFileWithModifiedTime } from "../utils/readFileWithModifiedTime";
import { getOrSetMDXCompileCache } from "./caches/MDXCompileCache";

interface Res {
  code: string;
  pageMeta: PageMeta;
}

const setter = (source: string, modified: string) => async (): Promise<Res> => {
  const { code, frontMatter } = await sourceParser(source);
  return { code, pageMeta: { modified, ...frontMatter, source } };
};
export const getEntryPageCodeAndPageMetaWithPID = async (
  pid: string
): Promise<Res | undefined> => {
  const { src, modified } = await readFileWithModifiedTime(pid);
  return await getOrSetMDXCompileCache(pid, modified, setter(src, modified));
};
