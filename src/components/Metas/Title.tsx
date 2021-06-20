import Head from "next/head";
import { useEffect, VFC } from "react";
import { SITE_NAME } from "../../constants/envNames";
import { setTitle } from "../hooks/slices/pageMetaSlice";
import { useDispatch } from "../hooks/store";

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
