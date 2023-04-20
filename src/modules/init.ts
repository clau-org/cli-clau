import { $, CliContext } from "../../deps.ts";
import { replaceInFiles } from "./utils.ts";

export type initNewProjectOptions = {
  name: string;
  dirpath: string;
  template: string;
  ctx: CliContext;
};

export async function initNewProject(options: initNewProjectOptions) {
  const {
    template,
    name = "svc",
    dirpath = Deno.cwd(),
    ctx: { logger },
  } = options;

  // Get working dirs
  const dirPathTemp = await Deno.makeTempDir();
  const dirPathCli = `${dirPathTemp}/.cli-clau`;
  const dirPathTemplate = `${dirPathCli}/.playground/${template}`;

  // Download template
  await Deno.mkdir(dirPathCli, { recursive: true });
  await $`git clone git@github.com:clau-org/mod-core.git ${dirPathCli}`;

  // Replace name in files (content and name/path)
  await replaceInFiles({
    dir: dirPathTemplate,
    search: "user",
    replacement: name,
  });

  // Move to directory selected
  await Deno.rename(dirPathTemplate, `${dirpath}/${name}`);

  // Remove temp directory
  await Deno.remove(`${dirPathTemp}`, { recursive: true });

  logger.info("init action", { name, dirpath, template });
}
