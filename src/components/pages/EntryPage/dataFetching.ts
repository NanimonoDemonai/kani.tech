import { promises as fs } from "fs";
import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { sourceParser } from "../../../utils/sourceParser";
import { EntryPageProps } from "./EntryPage";

export const getEntryPageStaticProps: GetStaticProps<EntryPageProps> = async ({
  params,
}) => {
  if (!params) return { notFound: true, revalidate };
  const src = await fs.readFile(`./src/entries/${params.pid}.mdx`, {
    encoding: "utf8",
  });
  const { code, frontMatter } = await sourceParser(src);
  return { props: { code, frontMatter }, revalidate };
};
