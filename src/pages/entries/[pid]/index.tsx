import { EntryPage } from "../../../components/pages/EntryPage";
import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from "fs";
import parser from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { revalidate } from "../../../constants/revalidate";
import { unknownObjectToFrontMatter } from "../../../buildLib/FrontMatterParser";

export default EntryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true, revalidate };
  const source = await fs.readFile(`./src/entries/${params.pid}.mdx`);
  const { data, content } = parser(source);
  const frontMatter = unknownObjectToFrontMatter(data);
  const mdxSource = await serialize(content);
  return { props: { source: mdxSource, frontMatter }, revalidate };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
