import { Plugin } from "unified";
import { Node } from "unist";
import { visit } from "unist-util-visit";

export const imageFindPlugin: (data: string[]) => Plugin =
  (data) => () => (ast) => {
    visit(
      ast,
      (node) => {
        return node.tagName === "img";
      },
      (node: Node) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const properties = node.properties as any;
        if (properties.src) {
          data.push(properties.src);
        }
      }
    );
  };
