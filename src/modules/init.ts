import { $, CliContext } from "../../deps.ts";
import { replaceByInDir, replaceNamesInDir } from "./utils.ts";

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
  const tempDirPath = await Deno.makeTempDir();
  const cliDir = `${tempDirPath}/.cli-clau`;
  const templateDir = `${cliDir}/.playground/${template}`;
  await Deno.mkdir(cliDir, { recursive: true });

  // Clone repository template
  await $`git clone git@github.com:clau-org/mod-core.git ${cliDir}`;

  // Replace name
  const search = "user";
  const replacement = name;
  const dir = templateDir;
  await replaceByInDir({ dir, search, replacement });
  await replaceNamesInDir({ dir, search, replacement });

  // Move to dirpath
  await Deno.rename(templateDir, `${dirpath}`);

  // Remove tempDirPath
  await Deno.remove(`${tempDirPath}`, { recursive: true });

  logger.info("init action", { name, dirpath, template });
}
