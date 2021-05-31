import parser from "gray-matter";
import { unknownObjectToFrontMatter } from "../validators/unknownObjectToFrontMatter";
import { FrontMatter } from "../types/FrontMatter";

interface Res {
  frontMatter: FrontMatter;
  content: string;
}

export const frontMatterParser = (source: string): Res => {
  const { data, content } = parser(source);
  const frontMatter = unknownObjectToFrontMatter(data);
  return { frontMatter, content };
};
