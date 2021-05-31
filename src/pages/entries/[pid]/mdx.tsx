import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from "fs";
import { MDXPage } from "../../../components/pages/MDXPage";
import { revalidate } from "../../../constants/revalidate";
import { frontMatterParser } from "../../../utils/FrontMatterParser";

export default MDXPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true, revalidate };
  const source = await fs.readFile(`./src/entries/${params.pid}.mdx`, {
    encoding: "utf8",
  });
  const { frontMatter } = frontMatterParser(source);

  return { props: { source, frontMatter }, revalidate };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
