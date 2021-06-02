import { Options } from "@mdx-js/mdx";
import { Plugin } from "unified";
import { FrontMatter } from "../types/FrontMatter";
import { frontMatterParser } from "./FrontMatterParser";
import { mdxSanitizePlugin } from "./mdxSanitizePlugin";

interface Res {
  frontMatter: FrontMatter;
  content: string;
  mdxOptions: Options;
}

export const sourceParser = (src: string): Res => {
  const { frontMatter, content } = frontMatterParser(src);
  const rehypePlugins: Plugin[] = [];
  if (!frontMatter.disableSanitize) {
    rehypePlugins.push(mdxSanitizePlugin);
  }
  const mdxOptions = { rehypePlugins };

  return {
    frontMatter,
    content,
    mdxOptions,
  };
};
