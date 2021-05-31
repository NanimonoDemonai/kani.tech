import { NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { FrontMatter } from "../../../types/FrontMatter";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Title } from "../../Metas/Title";

export interface EntryPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
}

export const EntryPage: NextPage<EntryPageProps> = ({
  source,
  frontMatter: { title },
}) => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <article>
      <Title title={title} />
      <MDXRemote {...source} components={{}} />
      <Link href={`${pid}/mdx`}>ソースコード</Link>
    </article>
  );
};
