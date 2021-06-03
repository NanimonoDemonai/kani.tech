import gh from "hast-util-sanitize/lib/github.json";

export const allowTagList = gh.tagNames;
export const allowAttributesList: {
  "*": string[];
  [name: string]: string[] | undefined;
} = gh.attributes as never;
export const allowProtocol = ["https:", "http:"];
