import path from "path";
import { PrismaClient } from "@prisma/client";
import { getEntryPagePathList } from "../constants/EntryPageList";
import { frontMatterParser } from "../utils/parsers/FrontMatterParser";
import { readFileWithModifiedTime } from "../utils/readFileWithModifiedTime";

const prisma = new PrismaClient();

async function main() {
  await prisma.entry.deleteMany({});
  const entryPagePathList = await getEntryPagePathList();
  const dataReq = entryPagePathList.map((e) => readFileWithModifiedTime(e));
  const data = await Promise.all(dataReq);

  const result = data.map((e, i) => ({
    source: e.src,
    pageName: path.basename(entryPagePathList[i], ".mdx"),
    pageTitle: frontMatterParser(e.src).frontMatter.title,
    modified: e.modified,
  }));
  const tableReq = result.map((e) => prisma.entry.create({ data: e }));
  const table = await Promise.all(tableReq);
  console.log(table);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
