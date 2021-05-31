import { frontMatterParser } from "./FrontMatterParser";
import { Plugin } from "unified";
import sanitize from "rehype-sanitize";
import { FrontMatter } from "../types/FrontMatter";
import { Options } from "@mdx-js/mdx";

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
