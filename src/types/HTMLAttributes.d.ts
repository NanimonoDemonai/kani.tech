import { AtomicProps } from "@fower/types";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  interface HTMLAttributes<T> extends AtomicProps {}
}
