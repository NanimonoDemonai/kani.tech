import rehypePrism from "@mapbox/rehype-prism";
import { bundleMDX } from "mdx-bundler";
import gfm from "remark-gfm";
import { FrontMatter } from "../../types/FrontMatter";
import { imageFindPlugin } from "../rehypePlugins/imageFindPlugin";
import { mdxSanitizePlugin } from "../rehypePlugins/mdxSanitizePlugin";
import { frontMatterParser } from "./FrontMatterParser";

interface Res {
  frontMatter: FrontMatter;
  content: string;
  code: string;
  images: string[];
}

export const sourceParser = async (src: string): Promise<Res> => {
  const { frontMatter, content } = frontMatterParser(src);

  const images: string[] = [];
  const { code } = await bundleMDX(content, {
    xdmOptions: (options) => {
      options.remarkPlugins = [gfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypePrism,
        imageFindPlugin(images),
      ];
      if (!frontMatter.disableSanitize) {
        options.rehypePlugins.push(mdxSanitizePlugin);
      }
      return options;
    },
  });
  return { content, frontMatter, code, images };
};
