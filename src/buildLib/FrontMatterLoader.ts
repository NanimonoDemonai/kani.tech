import { loader } from "webpack";
import parser from "gray-matter";
import stringifyObject from "stringify-object";
import { unknownObjectToFrontMatter } from "./FrontMatterParser";
const mdx: (content: string) => Promise<string> = require("@mdx-js/mdx");
// language=js
const DEFAULT_RENDERER = `
import React from 'react'
import {mdx} from '@mdx-js/react'
`;

export const FMLoader: loader.Loader = function (src) {
  const callback = this.async();
  const { data, content } = parser(src);
  const frontMatter = unknownObjectToFrontMatter(data);
  mdx(content).then((jsx) => {
    const code = [
      DEFAULT_RENDERER,
      // language=js
      `export const frontMatter = ${stringifyObject(frontMatter)}`,
      jsx,
    ].join("\n");
    if (callback) return callback(null, code);
  });
};
