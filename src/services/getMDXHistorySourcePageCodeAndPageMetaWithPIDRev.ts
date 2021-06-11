import { PageMeta } from "../types/PageMeta";
import { prisma } from "./client/PrismClient";

interface Res {
  pageMeta: PageMeta;
}

export const getMDXHistorySourcePageCodeAndPageMetaWithPIDRev = async (
  pageName: string,
  revision: number
): Promise<Res | undefined> => {
  const entry = await prisma.entry.findUnique({
    where: { pageName },
    include: {
      history: { select: { source: true }, where: { revision } },
      tags: true,
    },
  });
  if (!entry) return;
  return {
    pageMeta: {
      pageName,
      modified: entry.updatedAt.toJSON(),
      source: entry.history[0]?.source || "",
      title: entry.pageTitle,
      tags: entry.tags.map((e) => e.tagName),
      revision,
    },
  };
};
