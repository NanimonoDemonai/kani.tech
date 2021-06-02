import { Plugin } from "unified";
import { Parent, Node } from "unist";
import visit from "unist-util-visit";
import { allowTagList } from "../constants/allowTagList";

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
    if (!allowTagList.includes(node.name as string)) {
      return _strip(parent, index);
    }
    const attributes: { value?: { type: string } }[] = node.attributes as any;
    const hasAttributeJS = attributes.some(
      (e) => e?.value?.type === "mdxJsxAttributeValueExpression"
    );
    if (hasAttributeJS) {
      return _strip(parent, index);
    }
  });
};
