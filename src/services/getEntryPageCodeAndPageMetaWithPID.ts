import { PageMeta } from "../types/PageMeta";
import { getOrSetMDXCompileCache } from "./caches/MDXCompileCache";
import { prisma } from "./client/PrismClient";

interface Res {
  code: string;
  pageMeta: PageMeta;
}

export const getEntryPageCodeAndPageMetaWithPID = async (
  pid: string
): Promise<Res | undefined> => {
  const data = await prisma.entry.findFirst({
    where: { pageName: pid },
    select: {
      updatedAt: true,
      source: true,
      pageTitle: true,
      revision: true,
      id: true,
      history: {
        select: { revision: true, createdAt: true },
      },
      tags: { select: { tagName: true } },
    },
  });

  if (data) {
    const { source } = data;
    const cacheValue = await getOrSetMDXCompileCache(
      pid,
      data.revision,
      source
    );
    if (!cacheValue) return;
    return {
      code: cacheValue.code,
      pageMeta: {
        tags: data.tags.map((e) => e.tagName),
        pageName: pid,
        title: data.pageTitle,
        source,
        modified: data.updatedAt.toJSON(),
        revision: data.revision,
        revisions: data.history.map((e) => ({
          revision: e.revision,
          createdAt: e.createdAt.toJSON(),
        })),
      },
    };
  }
};
