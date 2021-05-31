import { loader } from "webpack";
import stringifyObject from "stringify-object";
import mdx from "@mdx-js/mdx";
import { sourceParser } from "../utils/sourceParser";

// language=js
const DEFAULT_RENDERER = `
import React from 'react'
import {mdx} from '@mdx-js/react'
`;

export const FMLoader: loader.Loader = function (src) {
  const callback = this.async();
  const { content, frontMatter, mdxOptions } = sourceParser(src.toString());

  mdx(content, mdxOptions).then((jsx) => {
    const code = [
      DEFAULT_RENDERER,
      // language=js
      `export const frontMatter = ${stringifyObject(frontMatter)}`,
      jsx,
    ].join("\n");
    if (callback) return callback(null, code);
  });
};
