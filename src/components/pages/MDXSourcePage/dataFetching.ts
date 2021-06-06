import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { MDXSourcePageProps } from "./MDXSourcePage";
import { readFileWithModifiedTime } from "../../../utils/readFileWithModifiedTime";
import { sourceParser } from "../../../utils/parsers/sourceParser";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";

export const getMDXSourcePageStaticProps: GetStaticProps<MDXSourcePageProps> =
  async ({ params }) => {
    const pid = unknownParamsToPIDParams(params);
    if (!pid) return { notFound: true, revalidate };
    const { src, modified } = await readFileWithModifiedTime(pid);
    const { frontMatter } = await sourceParser(src);
    return {
      props: { source: src, pageMeta: { modified, ...frontMatter } },
      revalidate,
    };
  };
