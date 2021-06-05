import { bundleMDX } from "mdx-bundler";
import { FrontMatter } from "../types/FrontMatter";
import { frontMatterParser } from "./FrontMatterParser";
import { mdxSanitizePlugin } from "./mdxSanitizePlugin";

interface Res {
  frontMatter: FrontMatter;
  code: string;
}

export const sourceParser = async (src: string): Promise<Res> => {
  const { frontMatter, content } = frontMatterParser(src);

  const { code } = await bundleMDX(content, {
    xdmOptions: (options) => {
      if (!frontMatter.disableSanitize) {
        options.rehypePlugins?.push(mdxSanitizePlugin);
      }
      return options;
    },
  });
  return {
    frontMatter,
    code,
  };
};
