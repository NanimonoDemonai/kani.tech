import { PageMeta } from "../types/PageMeta";
import { prisma } from "./client/PrismClient";

interface Res {
  pageMeta: PageMeta;
}

export const getMDXSourcePageCodeAndPageMetaWithPID = async (
  pageName: string
): Promise<Res | undefined> => {
  const entry = await prisma.entry.findUnique({ where: { pageName } });
  if (!entry) return;
  return {
    pageMeta: {
      modified: entry.modified.toJSON(),
      source: entry.source,
      title: entry.pageTitle,
    },
  };
};
