import type { Plugin } from "unified";
import type { Node } from "unist";
import visit from "unist-util-visit";
import { allowTagList } from "../../constants/allowTagList";
import { Attribute } from "./types";
import { isAttributeInvalid } from "./utils/isAttributeInvalid";
import { isNodeMdxJsx, stripNode } from "./utils/utils";

export const mdxSanitizePlugin: Plugin = () => (ast) => {
  visit(ast, isNodeMdxJsx, (node: Node, index, parent) => {
    const nodeName = node.name;
    if (typeof nodeName !== "string") {
      return stripNode({ parent, index });
    }

    if (!allowTagList.includes(nodeName)) {
      return stripNode({ parent, index });
    }

    const attributes: Attribute[] = node.attributes as never;
    if (attributes.some(isAttributeInvalid(nodeName))) {
      return stripNode({ parent, index });
    }
  });
};
