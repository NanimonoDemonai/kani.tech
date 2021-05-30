import { NextPage } from "next";
import { FrontMatter } from "../../types/FrontMatter";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Link from "next/link";
import { getEntryPathWithEntryName } from "../../utils/getURL";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
  source: string;
  frontMatter: FrontMatter;
}

export const MDXPage: NextPage<Props> = ({ source, frontMatter }) => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <SyntaxHighlighter language="markdown" style={monokaiSublime}>
        {`${source}`}
      </SyntaxHighlighter>
      <Link href={getEntryPathWithEntryName(`${pid}`)}>戻る</Link>
    </div>
  );
};
