declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { FrontMatter } from "./FrontMatter";
  const MDXComponent: ComponentType;
  export const frontMatter: FrontMatter;
  export default MDXComponent;
}
