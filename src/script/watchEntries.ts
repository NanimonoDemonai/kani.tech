import path from "path";
import { PrismaClient } from "@prisma/client";
import { watch } from "chokidar";
import { frontMatterParser } from "../utils/parsers/FrontMatterParser";
import { readFileWithModifiedTime } from "../utils/readFileWithModifiedTime";

const prisma = new PrismaClient();

watch("./src/entries/*.mdx").on("all", async (event, filePath) => {
  console.log(event, filePath);
  const file = await readFileWithModifiedTime(filePath);
  const pageName = path.basename(filePath, ".mdx");
  const pageTitle = frontMatterParser(file.src).frontMatter.title;
  const upsertUser = await prisma.entry.upsert({
    where: {
      pageName,
    },
    update: {
      source: file.src,
      pageTitle,
      modified: file.modified,
    },
    create: {
      pageName,
      source: file.src,
      pageTitle,
      modified: file.modified,
    },
  });
  console.log("upserted", upsertUser);
});
