import { EntryList } from "../EntryList/EntryList";
import { NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { FrontMatter } from "../../../types/FrontMatter";
import Link from "next/link";
import { useRouter } from "next/router";

export interface EntryPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
}

export const EntryPage: NextPage<EntryPageProps> = ({
  source,
  frontMatter,
}) => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <EntryList>
      <MDXRemote {...source} components={{}} />
      <Link href={`${pid}/mdx`}>ソースコード</Link>
    </EntryList>
  );
};
