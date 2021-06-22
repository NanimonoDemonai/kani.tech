import { ImageObject as serverImageObject } from "@prisma/client";
import { ImageObject } from "../types/PageMeta";

export const serializeImageObject = (
  imageObjects: serverImageObject[]
): ImageObject[] =>
  imageObjects.map((e) => ({
    ...e,
    modified: e.updatedAt.toJSON(),
    verified: `${e.verified}`,
  }));
