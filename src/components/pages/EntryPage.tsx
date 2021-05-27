import { useRouter } from "next/router";
import { Entry } from "../entries/Entry";
import { NotFoundErrorPage } from "./NotFoundErrorPage";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { FrontMatter } from "../../@types/mdx";

export const EntryPage: NextPage<{ frontMatter: FrontMatter }> = ({
  frontMatter,
}) => {
  const router = useRouter();
  const { pid } = router.query;
  const module = import(`../../entries/${pid}.mdx`);
  const EntryComponent = dynamic(() =>
    module.then((mod) => mod).catch(() => NotFoundErrorPage)
  );

  if (typeof pid === "string")
    return (
      <>
        <h1>{frontMatter.title}</h1>
        <Entry Component={EntryComponent} />
      </>
    );
  return <NotFoundErrorPage />;
};
