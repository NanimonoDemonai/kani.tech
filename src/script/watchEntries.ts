import path from "path";
import { PrismaClient } from "@prisma/client";
import { FSWatcher, watch } from "chokidar";
import { IDockerComposeOptions, stop } from "docker-compose";
import { createOrUpsertEntry } from "../services/createOrUpsertEntry";
import { deleteEntry } from "../services/deleteEntry";
import { frontMatterParser } from "../utils/parsers/FrontMatterParser";
import { readFileWithModifiedTime } from "../utils/readFileWithModifiedTime";

const dockerOption: IDockerComposeOptions = {
  log: true,
  cwd: "./local-docker",
};

let watcher: FSWatcher;
const prisma = new PrismaClient();

const fileAdd = async (filePath: string) => {
  console.log("change or add", filePath);
  const pageName = path.basename(filePath, ".mdx");
  const file = await readFileWithModifiedTime(filePath);
  const { title: pageTitle, tags } = frontMatterParser(file.src).frontMatter;

  const upsertEntry = await createOrUpsertEntry({
    tags,
    source: file.src,
    pageName,
    pageTitle,
  });
  console.log("upstarted", upsertEntry.pageName, upsertEntry.pageTitle);
};

const fileRemove = async (filePath: string) => {
  console.log("removed", filePath);
  const pageName = path.basename(filePath, ".mdx");

  const deletedEntry = await deleteEntry(pageName);
  console.log("removed", deletedEntry.pageName, deletedEntry.pageTitle);
};

process.on("SIGINT", function () {
  console.log("terminating");

  stop(dockerOption).then(() => {
    console.log("terminated docker");
    watcher.close().then(() => {
      console.log("terminated watcher");
      process.exit(1);
    });
  });
});

async function main() {
  await prisma.history.deleteMany();
  await prisma.entry.deleteMany();
  //await prisma.tag.deleteMany();
  console.log("DB initialized");
  watcher = watch("./src/entries/*.mdx");
  watcher.on("add", fileAdd);
  watcher.on("change", fileAdd);
  watcher.on("unlink", fileRemove);
  console.log("Docker Ready");
}

main()
  .catch(async (e) => {
    console.log(e);
    await watcher?.close();
    await stop(dockerOption);
  })
  .finally(async () => {
    /* noop */
  });
