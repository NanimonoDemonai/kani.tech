import rehypePrism from "@mapbox/rehype-prism";
import { bundleMDX } from "mdx-bundler";
import gfm from "remark-gfm";
import { FrontMatter } from "../../types/FrontMatter";
import { mdxSanitizePlugin } from "../rehypePlugins/mdxSanitizePlugin";
import { frontMatterParser } from "./FrontMatterParser";

interface Res {
  frontMatter: FrontMatter;
  code: string;
}

export const sourceParser = async (src: string): Promise<Res> => {
  const { frontMatter, content } = frontMatterParser(src);

  const { code } = await bundleMDX(content, {
    xdmOptions: (options) => {
      options.remarkPlugins = [gfm];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];
      if (!frontMatter.disableSanitize) {
        options.rehypePlugins.push(mdxSanitizePlugin);
      }
      return options;
    },
  });
  return {
    frontMatter,
    code,
  };
};
