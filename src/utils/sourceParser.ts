import { Options } from "@mdx-js/mdx";
import sanitize from "rehype-sanitize";
import { Plugin } from "unified";
import { FrontMatter } from "../types/FrontMatter";
import { frontMatterParser } from "./FrontMatterParser";

interface Res {
  frontMatter: FrontMatter;
  content: string;
  mdxOptions: Options;
}

export const sourceParser = (src: string): Res => {
  const { frontMatter, content } = frontMatterParser(src);
  const rehypePlugins: Plugin[] = [];
  if (!frontMatter.disableSanitize) {
    rehypePlugins.push(sanitize);
  }
  const mdxOptions = { rehypePlugins };

  return {
    frontMatter,
    content,
    mdxOptions,
  };
};
