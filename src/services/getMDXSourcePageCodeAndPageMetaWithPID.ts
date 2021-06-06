import { PageMeta } from "../types/PageMeta";
import { sourceParser } from "../utils/parsers/sourceParser";
import { prisma } from "./client/PrismClient";

interface Res {
  pageMeta: PageMeta;
}

export const getMDXSourcePageCodeAndPageMetaWithPID = async (
  pageName: string
): Promise<Res | undefined> => {
  const entry = await prisma.entry.findUnique({ where: { pageName } });
  if (!entry) return;
  const { frontMatter } = await sourceParser(entry.source);
  return {
    pageMeta: {
      modified: entry.modified.toJSON(),
      source: entry.source,
      title: frontMatter.title,
    },
  };
};
