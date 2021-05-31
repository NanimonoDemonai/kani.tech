import { NextPage } from "next";
import { FrontMatter } from "../../../types/FrontMatter";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

import Link from "next/link";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { useRouter } from "next/router";
import Head from "next/head";
SyntaxHighlighter.registerLanguage("markdown", markdown);

export interface MDXSourcePageProps {
  source: string;
  frontMatter: FrontMatter;
}

export const MDXSourcePage: NextPage<MDXSourcePageProps> = ({
  source,
  frontMatter,
}) => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <SyntaxHighlighter language="markdown" style={dark}>
        {`${source}`}
      </SyntaxHighlighter>
      <Link href={getEntryPathWithEntryName(`${pid}`)}>戻る</Link>
    </div>
  );
};
