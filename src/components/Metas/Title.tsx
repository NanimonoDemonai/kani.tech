import { VFC } from "react";
import Head from "next/head";

export const Title: VFC<{ title: string }> = ({ title }) => (
  <Head>
    <title>{title} | kani.tech</title>
  </Head>
);
