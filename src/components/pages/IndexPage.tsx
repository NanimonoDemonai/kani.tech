import { NextPage } from "next";

import clsx from "clsx";

export const IndexPage: NextPage = () => (
  <p
    className={clsx([
      "font-mono",
      "border",
      "hyphens-auto",
      "text-2xl",
      "text-current",
    ])}
  >
    カニのページ🦀
  </p>
);
