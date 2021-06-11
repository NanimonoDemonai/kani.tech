import { Entry } from "@prisma/client";
import { prisma } from "./client/PrismClient";

export const deleteEntry = async (pageName: string): Promise<Entry> =>
  await prisma.entry.delete({
    where: {
      pageName,
    },
  });
