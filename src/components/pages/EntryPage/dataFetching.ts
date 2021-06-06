import { promises as fs } from "fs";
import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { sourceParser } from "../../../utils/parsers/sourceParser";
import { EntryPageProps } from "./EntryPage";

export const getEntryPageStaticProps: GetStaticProps<EntryPageProps> = async ({
  params,
}) => {
  if (!params) return { notFound: true, revalidate };
  const path = `./src/entries/${params.pid}.mdx`;
  const { mtime } = await fs.stat(path);
  const src = await fs.readFile(path, {
    encoding: "utf8",
  });
  const { code, frontMatter } = await sourceParser(src);
  return {
    props: { code, pageMeta: { modified: mtime.toJSON(), ...frontMatter } },
    revalidate,
  };
};
