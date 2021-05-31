import { FrontMatter } from "../types/FrontMatter";
import { z } from "zod";

const stringParser = z.string();
const booleanParser = z.boolean();
export const unknownObjectToFrontMatter = (unknownObject: {
  [key: string]: unknown;
}): FrontMatter => {
  const titleRes = stringParser.safeParse(unknownObject["title"]);
  const disableSanitize = booleanParser.safeParse(
    unknownObject["disableSanitize"]
  );
  return {
    title: titleRes.success ? titleRes.data : "",
    disableSanitize: disableSanitize.success ? disableSanitize.data : false,
  };
};
