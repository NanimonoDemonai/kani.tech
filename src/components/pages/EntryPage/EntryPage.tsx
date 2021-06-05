import { NextPage } from "next";
import { FrontMatter } from "../../../types/FrontMatter";
import Link from "next/link";
import { useRouter } from "next/router";
import { Title } from "../../Metas/Title";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

export interface EntryPageProps {
  code: string;
  frontMatter: FrontMatter;
}

export const EntryPage: NextPage<EntryPageProps> = ({
  code,
  frontMatter: { title },
}) => {
  const router = useRouter();
  const { pid } = router.query;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <article>
      <Title title={title} />
      <Component />
      <Link href={`${pid}/mdx`}>ソースコード</Link>
    </article>
  );
};
