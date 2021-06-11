import { PageMeta } from "../types/PageMeta";
import { prisma } from "./client/PrismClient";

interface Res {
  pageMeta: PageMeta;
}

export const getMDXSourcePageCodeAndPageMetaWithPID = async (
  pageName: string
): Promise<Res | undefined> => {
  const entry = await prisma.entry.findUnique({
    where: { pageName },
    include: { tags: true },
  });
  if (!entry) return;
  return {
    pageMeta: {
      pageName,
      modified: entry.updatedAt.toJSON(),
      source: entry.source,
      title: entry.pageTitle,
      tags: entry.tags.map((e) => e.tagName),
    },
  };
};
