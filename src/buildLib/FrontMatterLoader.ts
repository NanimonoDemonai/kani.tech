import { loader } from "webpack";
import parser from "gray-matter";
import stringifyObject from "stringify-object";
import { unknownObjectToFrontMatter } from "./FrontMatterParser";
import mdx from "@mdx-js/mdx";
import sanitize from "rehype-sanitize";
import { Plugin } from "unified";

// language=js
const DEFAULT_RENDERER = `
import React from 'react'
import {mdx} from '@mdx-js/react'
`;

export const FMLoader: loader.Loader = function (src) {
  const callback = this.async();
  const { data, content } = parser(src);
  const frontMatter = unknownObjectToFrontMatter(data);
  const rehypePlugins: Plugin[] = [];
  if (!frontMatter.disableSanitize) {
    rehypePlugins.push(sanitize);
  }
  mdx(content, { rehypePlugins }).then((jsx) => {
    const code = [
      DEFAULT_RENDERER,
      // language=js
      `export const frontMatter = ${stringifyObject(frontMatter)}`,
      jsx,
    ].join("\n");
    if (callback) return callback(null, code);
  });
};
