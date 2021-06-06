import { PageMeta } from "../../types/PageMeta";
import { readFileWithModifiedTime } from "../../utils/readFileWithModifiedTime";
import { sourceParser } from "../../utils/parsers/sourceParser";

interface Res {
  code: string;
  pageMeta: PageMeta;
}

export const getEntryPageCodeAndPageMetaWithPID = async (
  pid: string
): Promise<Res> => {
  const { src, modified } = await readFileWithModifiedTime(pid);
  const { code, frontMatter } = await sourceParser(src);
  return { code, pageMeta: { modified, ...frontMatter } };
};
