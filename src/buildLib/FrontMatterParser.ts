import { z } from "zod";
import type { FrontMatter } from "../types/FrontMatter";

const stringParser = z.string();

export const unknownObjectToFrontMatter = (unknownObject: {
  [key: string]: unknown;
}): FrontMatter => {
  const titleRes = stringParser.safeParse(unknownObject["title"]);
  return {
    title: titleRes.success ? titleRes.data : "",
  };
};
