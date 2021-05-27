export interface FrontMatter {
  title: string;
}
declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType;
  export const frontMatter: FrontMatter;
  export default MDXComponent;
}
