import { prisma } from "./client/PrismClient";

export const getEntriesByTag = async (
  tagName: string
): Promise<{ pageName: string }[]> =>
  await prisma.entry.findMany({
    select: { pageName: true },
    where: { tags: { some: { tagName } } },
  });
