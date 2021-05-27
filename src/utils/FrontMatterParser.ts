import { z } from "zod";
import { FrontMatter } from "../@types/mdx";
const stringParser = z.string();

export const unknownObjectToFrontMatter = (unknownObject: {
  [key: string]: unknown;
}): FrontMatter => {
  const titleRes = stringParser.safeParse(unknownObject["title"]);
  return {
    title: titleRes.success ? titleRes.data : "",
  };
};
