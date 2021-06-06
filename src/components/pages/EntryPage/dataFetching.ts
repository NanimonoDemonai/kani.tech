import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { sourceParser } from "../../../utils/parsers/sourceParser";
import { EntryPageProps } from "./EntryPage";
import { readFileWithModifiedTime } from "../../../utils/readFileWithModifiedTime";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";

export const getEntryPageStaticProps: GetStaticProps<EntryPageProps> = async ({
  params,
}) => {
  const pid = unknownParamsToPIDParams(params);
  if (!pid) return { notFound: true, revalidate };
  const { src, modified } = await readFileWithModifiedTime(pid);
  const { code, frontMatter } = await sourceParser(src);
  return {
    props: { code, pageMeta: { modified, ...frontMatter } },
    revalidate,
  };
};
