import { Entry } from "@prisma/client";
import { prisma } from "./client/PrismClient";

export interface CreateOrUpsertEntryParams {
  tags: string[];
  source: string;
  pageTitle: string;
  pageName: string;
}

export const createOrUpsertEntry = async ({
  tags,
  source,
  pageName,
  pageTitle,
}: CreateOrUpsertEntryParams): Promise<Entry> => {
  const revisionData = (revision: number) => ({
    source,
    pageTitle,
    pageName,
    tags: {
      connectOrCreate: tags.map((e) => ({
        where: { tagName: e },
        create: { tagName: e },
      })),
    },
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

  const latest = await prisma.entry.findUnique({
    where: { pageName },
    select: { revision: true },
  });
  if (!latest) {
    return prisma.entry.create({
      data: revisionData(0),
    });
  }
  const revision = latest.revision + 1;
  return prisma.entry.update({
    where: { pageName },
    data: revisionData(revision),
  });
};
