import { ImageObject as serverImageObject } from "@prisma/client";
import { ImageObject } from "../types/PageMeta";

export const serializeImageObject = (
  imageObjects: serverImageObject[]
): ImageObject[] =>
  imageObjects.map((e) => ({
    width: e.width,
    height: e.height,
    size: e.size,
    key: e.key,
    modified: e.updatedAt.toJSON(),
    verified: `${e.verified}`,
  }));
