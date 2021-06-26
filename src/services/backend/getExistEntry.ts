import { prisma } from "./client/PrismClient";

export const getExistEntry = async (pageName: string): Promise<boolean> => {
  const res = await prisma.entry.findUnique({
    select: { id: true },
    where: {
      pageName,
    },
  });
  return res !== null;
};
