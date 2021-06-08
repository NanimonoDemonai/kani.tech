import path from "path";
import { PrismaClient } from "@prisma/client";
import { watch } from "chokidar";
import { IDockerComposeOptions, stop } from "docker-compose";
import { frontMatterParser } from "../utils/parsers/FrontMatterParser";
import { readFileWithModifiedTime } from "../utils/readFileWithModifiedTime";

const dockerOption: IDockerComposeOptions = {
  log: true,
  cwd: "./local-docker",
};

const watcher = watch("./src/entries/*.mdx");
const prisma = new PrismaClient();
const fileAdd = async (filePath: string) => {
  console.log("change or add", filePath);
  const pageName = path.basename(filePath, ".mdx");

  const file = await readFileWithModifiedTime(filePath);
  const { title: pageTitle, tags } = frontMatterParser(file.src).frontMatter;

  const connectOrCreate = tags.map((e) => ({
    where: { tagName: e },
    create: { tagName: e },
  }));
  const update = {
    tags: { connectOrCreate },
    source: file.src,
    pageTitle,
    modified: file.modified,
  };
  const upsertEntry = await prisma.entry.upsert({
    where: {
      pageName,
    },
    update,
    create: {
      pageName,
      ...update,
    },
  });
  console.log("upstarted", upsertEntry.pageName, upsertEntry.pageTitle);
};

const fileRemove = async (filePath: string) => {
  console.log("removed", filePath);
  const pageName = path.basename(filePath, ".mdx");

  const upsertEntry = await prisma.entry.delete({
    where: {
      pageName,
    },
  });
  console.log("removed", upsertEntry.pageName, upsertEntry.pageTitle);
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
  watcher.on("add", fileAdd);
  watcher.on("change", fileAdd);
  watcher.on("unlink", fileRemove);
  console.log("Docker Ready");
}

main()
  .catch(async () => {
    await watcher.close();
    await stop(dockerOption);
  })
  .finally(async () => {
    /* noop */
  });
