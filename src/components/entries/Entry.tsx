import { VFC } from "react";
import dynamic from "next/dynamic";
import { NotFoundErrorPage } from "../pages/NotFoundErrorPage";
import Component from "../../entries/kani.mdx";

interface Props {
  pid: string;
}

const EntryComponent = (pid: string) =>
  dynamic(() =>
    import(`../entries/${pid}`)
      .then((mod) => mod)
      .catch(() => NotFoundErrorPage)
  );

export const Entry: VFC<Props> = ({ pid }) => (
  <div>
    <Component />
  </div>
);
