import { PageMeta } from "../types/PageMeta";
import { sourceParser } from "../utils/parsers/sourceParser";
import { getOrSetMDXCompileCache } from "./caches/MDXCompileCache";
import { prisma } from "./client/PrismClient";

interface Res {
  code: string;
  pageMeta: PageMeta;
  revisions?: { revision: number; createdAt: string }[];
}

const setter = (source: string, modified: string) => async (): Promise<Res> => {
  const { code, frontMatter } = await sourceParser(source);
  return { code, pageMeta: { modified, ...frontMatter, source } };
};

export const getEntryPageCodeAndPageMetaWithPID = async (
  pid: string
): Promise<Res | undefined> => {
  const data = await prisma.entry.findFirst({
    where: { pageName: pid },
    select: {
      updatedAt: true,
      source: true,
      revision: true,
      id: true,
      history: {
        select: { revision: true, createdAt: true },
      },
    },
  });

  if (data) {
    const { updatedAt: modifiedRaw, source } = data;
    const modified = modifiedRaw.toJSON();
    const cacheValue = await getOrSetMDXCompileCache(
      pid,
      modified,
      setter(source, modified)
    );
    if (!cacheValue) return;
    return {
      code: cacheValue.code,
      pageMeta: { ...cacheValue.pageMeta, revision: data.revision },
      revisions: data.history.map((e) => ({
        revision: e.revision,
        createdAt: e.createdAt.toJSON(),
      })),
    };
  }
};
