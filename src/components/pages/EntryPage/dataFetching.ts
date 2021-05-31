import { promises as fs } from "fs";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
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
  const { content, frontMatter, mdxOptions } = sourceParser(src);
  const source = await serialize(content, { mdxOptions });
  return { props: { source, frontMatter }, revalidate };
};
