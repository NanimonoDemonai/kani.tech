import { Plugin } from "unified";
import { Parent, Node } from "unist";
import visit from "unist-util-visit";
import {
  allowAttributesList,
  allowProtocol,
  allowTagList,
} from "../constants/allowTagList";

const _strip = (
  parent: Parent | undefined,
  index: number
): [typeof visit.SKIP, number] => {
  if (parent) parent.children.splice(index, 1);
  return [visit.SKIP, index];
};
const test: any = (node: Node) => node.type.startsWith("mdxJsx");
export const mdxSanitizePlugin: Plugin = () => (ast) => {
  visit(ast, test, (node, index, parent) => {
    const nodeName = node.name;
    if (typeof nodeName !== "string") {
      return _strip(parent, index);
    }
    if (!allowTagList.includes(nodeName)) {
      return _strip(parent, index);
    }
    const attributes: { value?: { type?: string } | string; name?: string }[] =
      node.attributes as any;
    const hasAttributeJS = attributes.some((attribute) => {
      const attributeValue = attribute.value;
      const attributeName = attribute.name;

      if (
        attributeValue &&
        typeof attributeValue !== "string" &&
        attributeValue.type === "mdxJsxAttributeValueExpression"
      )
        return true;

      if (typeof attributeName === "string") {
        const currentAllowAttributes = allowAttributesList[nodeName] || [];
        const allowAttributes = [
          ...allowAttributesList["*"],
          ...currentAllowAttributes,
        ];
        if (!allowAttributes.includes(attributeName)) return true;
        const mustProtocolCheck = ["src", "cite", "href"].includes(
          attributeName
        );
        if (mustProtocolCheck) {
          try {
            if (typeof attributeValue !== "string") return true;
            const url = new URL(attributeValue);
            if (!allowProtocol.includes(url.protocol)) return true;
          } catch (e) {
            return true;
          }
        }
      }
      return false;
    });
    if (hasAttributeJS) {
      return _strip(parent, index);
    }
  });
};
