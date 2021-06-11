import { ParsedUrlQuery } from "querystring";
import { z } from "zod";

const schema = z.object({
  pid: z.string(),
  rev: z.string(),
});

export const unknownParamsToPIDRevParams = (
  params: ParsedUrlQuery | undefined
): false | z.infer<typeof schema> => {
  const result = schema.safeParse(params);
  console.log(result);
  return result.success ? result.data : false;
};
