import { prisma } from "./client/PrismClient";

export const getTagList = async (): Promise<{ tagName: string }[]> =>
  await prisma.tag.findMany({ select: { tagName: true } });
