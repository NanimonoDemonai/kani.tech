import { defaultSchema } from "hast-util-sanitize";

export const allowTagList = defaultSchema.tagNames || [];
export const allowAttributesList: {
  "*": string[];
  [name: string]: string[] | undefined;
} = defaultSchema.attributes as never;
export const allowProtocol = ["https:", "http:"];
export const checkProtocolAttributeList = ["src", "cite", "href"];
