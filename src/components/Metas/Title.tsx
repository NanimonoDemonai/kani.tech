import { useEffect, VFC } from "react";
import Head from "next/head";
import { SITE_NAME } from "../../constants/envNames";
import { useDispatch } from "../hooks/store";
import { setTitle } from "../hooks/slices/pageMetaSlice";

export const Title: VFC<{ title: string }> = ({ title }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle(title));
  }, [title, dispatch]);
  return (
    <Head>
      <title>
        {title} | {SITE_NAME}
      </title>
    </Head>
  );
};
