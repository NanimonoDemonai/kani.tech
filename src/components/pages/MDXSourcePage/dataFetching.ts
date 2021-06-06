import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { MDXSourcePageProps } from "./MDXSourcePage";
import { readFileWithModifiedTime } from "../../../utils/readFileWithModifiedTime";
import { sourceParser } from "../../../utils/parsers/sourceParser";

export const getMDXSourcePageStaticProps: GetStaticProps<MDXSourcePageProps> =
  async ({ params }) => {
    if (!params) return { notFound: true, revalidate };
    const pid = params.pid;
    if (typeof pid !== "string") return { notFound: true, revalidate };
    const { src, modified } = await readFileWithModifiedTime(pid);
    const { frontMatter } = await sourceParser(src);
    return {
      props: { source: src, pageMeta: { modified, ...frontMatter } },
      revalidate,
    };
  };
