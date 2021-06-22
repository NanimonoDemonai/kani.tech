import { ImageObject, PageMeta } from "../types/PageMeta";
import { sourceParser } from "../utils/parsers/sourceParser";
import { prisma } from "./client/PrismClient";

interface Res {
  code: string;
  pageMeta: PageMeta;
}

export const getEntryPageCodeAndPageMetaWithPID = async (
  pid: string
): Promise<Res | undefined> => {
  const data = await prisma.entry.findFirst({
    where: { pageName: pid },
    select: {
      updatedAt: true,
      source: true,
      pageTitle: true,
      revision: true,
      id: true,
      history: {
        select: { revision: true, createdAt: true },
      },
      tags: { select: { tagName: true } },
    },
  });
  const object = await prisma.objectDirectory.findUnique({
    where: { keyPrefix: pid },
    include: {
      imageObjects: true,
    },
  });
  if (data) {
    const { source } = data;
    const { code } = await sourceParser(source);

    let imageObject: ImageObject[] = [];
    if (object) {
      imageObject = object.imageObjects.map<ImageObject>((e) => ({
        fileKey: e.key,
        height: e.height,
        size: e.size,
        width: e.width,
      }));
    }

    return {
      code,
      pageMeta: {
        tags: data.tags.map((e) => e.tagName),
        pageName: pid,
        title: data.pageTitle,
        source,
        modified: data.updatedAt.toJSON(),
        revision: data.revision,
        revisions: data.history.map((e) => ({
          revision: e.revision,
          createdAt: e.createdAt.toJSON(),
        })),
        images: [],
        imageObjects: imageObject,
      },
    };
  }
};
