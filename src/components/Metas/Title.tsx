import { VFC } from "react";
import Head from "next/head";
import { SITE_NAME } from "../../constants/envNames";

export const Title: VFC<{ title: string }> = ({ title }) => {
  return (
    <Head>
      <title>
        {title} | {SITE_NAME}
      </title>
    </Head>
  );
};
