import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

export const IndexPage: NextPage = () => (
  <article>
    <Head>
      <title>kani.tech</title>
    </Head>
    <h1>カニのページ🦀</h1>
    <Link href={"/entries"}>
      <a>ページ一覧</a>
    </Link>
  </article>
);
