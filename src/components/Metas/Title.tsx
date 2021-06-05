import { useEffect, VFC } from "react";
import Head from "next/head";
import { SITE_NAME } from "../../constants/envNames";
import { useRecoilState } from "recoil";
import { titleAtoms } from "../../atoms/title";

export const Title: VFC<{ title: string }> = ({ title }) => {
  const setTitle = useRecoilState(titleAtoms)[1];
  useEffect(() => {
    console.log(title);
    setTitle(title);
  }, [title]);
  return (
    <Head>
      <title>
        {title} | {SITE_NAME}
      </title>
    </Head>
  );
};
