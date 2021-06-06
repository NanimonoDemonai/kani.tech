import type { Node } from "unist";
import { TestFunction } from "unist-util-is";
import visit from "unist-util-visit";

type VisitorParameters = Parameters<visit.Visitor<never>>;

export const isNodeMdxJsx: TestFunction<Node> = (node: any): node is Node =>
  node.type.startsWith("mdxJsx");

/**
 * visitで訪れたノードを削除する
 * @param props visitorの第二第三引数
 */
export const stripNode = (props: {
  index: VisitorParameters[1];
  parent: VisitorParameters[2];
}): [typeof visit.SKIP, number] => {
  const { parent, index } = props;
  if (parent) parent.children.splice(index, 1);
  return [visit.SKIP, index];
};
