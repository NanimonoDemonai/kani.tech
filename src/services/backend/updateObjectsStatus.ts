import type { Verified } from "@prisma/client";
import { prisma } from "./client/PrismClient";

export const updateObjectsStatus = async (
  keys: string[],
  verified: Verified
): Promise<void> => {
  if (keys.length < 1) return;
  await prisma.imageObject.updateMany({
    where: {
      key: { in: keys },
    },
    data: {
      verified,
    },
  });
};
