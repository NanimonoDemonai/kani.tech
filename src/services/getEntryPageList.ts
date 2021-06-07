import { prisma } from "./client/PrismClient";

export const getEntryPageList = async (): Promise<
  { pageName: string; modified: string }[]
> => {
  const result = await prisma.entry.findMany({
    select: {
      pageName: true,
      modified: true,
    },
  });
  return result.map((e) => ({
    pageName: e.pageName,
    modified: e.modified.toJSON(),
  }));
};
