import { z } from "zod";
import { ParsedUrlQuery } from "querystring";

const schema = z.object({
  pid: z.string(),
});

export const unknownParamsToPIDParams = (
  params: ParsedUrlQuery | undefined
): false | string => {
  const result = schema.safeParse(params);
  return result.success ? result.data.pid : false;
};
