import { z } from "zod";
import { FrontMatter } from "../../types/FrontMatter";

const DEFAULT_VALUE: FrontMatter = {
  title: "",
  disableSanitize: false,
  tags: [],
};
const schema = z.object({
  title: z.string().default(DEFAULT_VALUE.title),
  disableSanitize: z.boolean().default(DEFAULT_VALUE.disableSanitize),
  tags: z.array(z.string()).default(DEFAULT_VALUE.tags),
});

export const unknownObjectToFrontMatter = (unknownObject: {
  [key: string]: unknown;
}): FrontMatter => {
  const result = schema.safeParse(unknownObject);
  return result.success ? result.data : DEFAULT_VALUE;
};
