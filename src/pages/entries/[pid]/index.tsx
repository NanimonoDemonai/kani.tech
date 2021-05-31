import { EntryPage } from "../../../components/pages/EntryPage";
import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { revalidate } from "../../../constants/revalidate";
import { sourceParser } from "../../../utils/sourceParser";

export default EntryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true, revalidate };
  const src = await fs.readFile(`./src/entries/${params.pid}.mdx`, {
    encoding: "utf8",
  });
  const { content, frontMatter, mdxOptions } = sourceParser(src);
  const source = await serialize(content, { mdxOptions });
  return { props: { source, frontMatter }, revalidate };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
