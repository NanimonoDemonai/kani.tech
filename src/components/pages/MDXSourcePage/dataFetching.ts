import { promises as fs } from "fs";
import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { frontMatterParser } from "../../../utils/parsers/FrontMatterParser";
import { MDXSourcePageProps } from "./MDXSourcePage";

export const getMDXSourcePageStaticProps: GetStaticProps<MDXSourcePageProps> =
  async ({ params }) => {
    if (!params) return { notFound: true, revalidate };
    const source = await fs.readFile(`./src/entries/${params.pid}.mdx`, {
      encoding: "utf8",
    });
    const { frontMatter } = frontMatterParser(source);

    return { props: { source, frontMatter }, revalidate };
  };
