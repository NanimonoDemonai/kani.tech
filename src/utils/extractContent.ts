import parser from "gray-matter";

export const extractContent = (source: string | undefined): string => {
  if (!source) return "";
  return parser(source).content.trim();
};
