import { loader } from "webpack";
import parser from "gray-matter";
import stringifyObject from "stringify-object";
import { unknownObjectToFrontMatter } from "./FrontMatterParser";
export const FMLoader: loader.Loader = function (src) {
  const callback = this.async();
  const { data, content } = parser(src);
  const frontMatter = unknownObjectToFrontMatter(data);
  console.log(frontMatter);
  const code = [
    `export const frontMatter = ${stringifyObject(frontMatter)}`,
    "",
    content,
  ].join("\n");

  if (callback) return callback(null, code);
};
