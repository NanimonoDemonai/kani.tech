import { Entry } from "@prisma/client";
import { prisma } from "./client/PrismClient";

export interface CreateOrUpsertEntryParams {
  tags: string[];
  source: string;
  pageTitle: string;
  pageName: string;
}

export const createOrUpsertEntry = async ({
  tags: newTags,
  source,
  pageName,
  pageTitle,
}: CreateOrUpsertEntryParams): Promise<Entry> => {
  const revisionData = (revision: number) => ({
    source,
    pageTitle,
    pageName,
    revision,
    history: {
      create: [
        {
          revision,
          source,
        },
      ],
    },
  });
  const tags = {
    connectOrCreate: newTags.map((e) => ({
      where: { tagName: e },
      create: { tagName: e },
    })),
  };

  // Race Conditionがあるためリトライはする
  const extractQuery = async () => {
    const latest = await prisma.entry.findUnique({
      where: { pageName },
      select: { revision: true, tags: true },
    });
    if (!latest) {
      return prisma.entry.create({
        data: {
          ...revisionData(0),
          tags,
        },
      });
    }
    const revision = latest.revision + 1;
    return prisma.entry.update({
      where: { pageName },
      data: {
        ...revisionData(revision),
        tags: {
          ...tags,
          disconnect: latest.tags
            .filter((e) => !newTags.includes(e.tagName))
            .map((e) => ({ id: e.id })),
        },
      },
    });
  };
  try {
    return await extractQuery();
  } catch (e) {
    return await extractQuery();
  }
};
