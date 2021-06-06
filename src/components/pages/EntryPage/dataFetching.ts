import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { sourceParser } from "../../../utils/parsers/sourceParser";
import { EntryPageProps } from "./EntryPage";
import { readFileWithModifiedTime } from "../../../utils/readFileWithModifiedTime";

export const getEntryPageStaticProps: GetStaticProps<EntryPageProps> = async ({
  params,
}) => {
  if (!params) return { notFound: true, revalidate };
  const pid = params.pid;
  if (typeof pid !== "string") return { notFound: true, revalidate };
  const { src, modified } = await readFileWithModifiedTime(pid);
  const { code, frontMatter } = await sourceParser(src);
  return {
    props: { code, pageMeta: { modified, ...frontMatter } },
    revalidate,
  };
};
