import { z } from "zod";

const scheme = z.object({
  src: z.string(),
});

export const unknownPropsToSrc = (
  props: unknown
): z.infer<typeof scheme> | undefined => {
  const parsed = scheme.safeParse(props);
  if (!parsed.success) return;
  return parsed.data;
};
