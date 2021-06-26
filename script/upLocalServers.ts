import { IDockerComposeOptions, upAll } from "docker-compose";

const dockerOption: IDockerComposeOptions = {
  log: true,
  cwd: "./local-docker",
};

async function main() {
  await upAll(dockerOption);
}

main().catch((e) => {
  throw e;
});
