import { promises as fs } from "fs";
import mdx from "@mdx-js/mdx";
import { mdxSanitizePlugin } from "./mdxSanitizePlugin";
import { sourceParser } from "./sourceParser";

describe("sourceParser", function () {
  it("should sourceParser option will strip tag", async function () {
    const src = await fs.readFile(`./src/test/entries/test.mdx`, {
      encoding: "utf8",
    });
    const { content } = sourceParser(src);
    const result = await mdx(content, {
      rehypePlugins: [
        mdxSanitizePlugin,
        () => (ast) => {
          /*console.log(JSON.stringify(ast, null, 4))*/
        },
      ],
    });
    expect(result).toMatchSnapshot();
  });
});
