import { ImageObject as serverImageObject } from "@prisma/client";
import { ImageObject } from "../types/PageMeta";

export const serializeImageObject = (
  imageObjects: serverImageObject[]
): ImageObject[] =>
  imageObjects.map((e) => ({
    height: e.height,
    key: e.key,
    size: e.size,
    width: e.width,
    modified: e.updatedAt.toJSON(),
    verified: `${e.verified}`,
  }));
