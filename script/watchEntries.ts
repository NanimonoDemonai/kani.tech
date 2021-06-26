import path from "path";
import { PrismaClient } from "@prisma/client";
import { FSWatcher, watch } from "chokidar";
import { IDockerComposeOptions, stop as stopDocker } from "docker-compose";
import { createOrUpsertEntry } from "../src/services/backend/createOrUpsertEntry";
import { deleteEntry } from "../src/services/backend/deleteEntry";
import { frontMatterParser } from "../src/utils/parsers/FrontMatterParser";
import { readFileWithModifiedTime } from "../src/utils/readFileWithModifiedTime";

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
  try {
    const upsertEntry = await createOrUpsertEntry({
      tags,
      source: file.src,
      pageName,
      pageTitle,
    });
    console.log("upstarted", upsertEntry.pageName, upsertEntry.pageTitle);
  } catch (e) {
    console.log(e, pageTitle, tags);
  }
};

const fileRemove = async (filePath: string) => {
  console.log("removed", filePath);
  const pageName = path.basename(filePath, ".mdx");

  const deletedEntry = await deleteEntry(pageName);
  console.log("removed", deletedEntry.pageName, deletedEntry.pageTitle);
};

process.on("SIGINT", function () {
  console.log("terminating");

  stopDocker(dockerOption).then(() => {
    console.log("terminated docker");
    watcher.close().then(() => {
      console.log("terminated watcher");
      process.exit(1);
    });
  });
});

async function main() {
  await prisma.tag.deleteMany();
  await prisma.history.deleteMany();
  await prisma.entry.deleteMany();
  console.log("DB initialized");
  watcher = watch("./entries/*.mdx");
  watcher.on("add", fileAdd);
  watcher.on("change", fileAdd);
  watcher.on("unlink", fileRemove);
  console.log("Docker Ready");
}

main()
  .catch(async (e) => {
    console.log(e);
    await watcher?.close();
    await stopDocker(dockerOption);
  })
  .finally(async () => {
    /* noop */
  });
