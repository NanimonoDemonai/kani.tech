import { loader } from "webpack";
import parser from "gray-matter";
import stringifyObject from "stringify-object";
export const FMLoader: loader.Loader = function (src) {
  const callback = this.async();
  const matter = parser(src);

  //const data = matter.data;

  //const frontMatter = unknownObjectToFrontMatter(data);

  const code = [
    `export const frontMatter = ${stringifyObject(matter.data)}`,
    "",
    matter.content,
  ].join("\n");

  if (callback) return callback(null, code);
};
