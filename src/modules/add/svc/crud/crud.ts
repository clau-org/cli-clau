import { CliContext } from "https://raw.githubusercontent.com/clau-org/mod-core/v0.0.11/mod.ts";
import $ from "https://deno.land/x/dax@0.30.1/mod.ts";
import { replaceInFiles } from "../../../utils.ts";
import { generateValidations } from "./validations.ts";

export type addRouterCrudOptions = {
  config: any;
  ctx: CliContext;
};

export default async function (options: addRouterCrudOptions) {
  const {
    config: {
      name = "user",
      template,
      dirpath = Deno.cwd(),
      props,
    },
    ctx: { logger },
  } = options;

  // Get working dirs
  const dirPathTemp = await Deno.makeTempDir();
  const dirPathCli = `${dirPathTemp}/.cli-clau`;
  const dirPathTemplate = `${dirPathCli}/.playground/${template}`;

  // Download template
  await Deno.mkdir(dirPathCli, { recursive: true });
  await $`git clone git@github.com:clau-org/mod-core.git ${dirPathCli}`;

  // Get specific files to update
  const filePathApiCreate = `${dirPathTemplate}/src/api/users/create.ts`;

  // Generate validation code
  await generateValidations({ path: filePathApiCreate, props });

  // Replace name in files (content and name/path)
  await replaceInFiles({
    dir: dirPathTemplate,
    search: "user",
    replacement: name,
  });

  // Move to directory selected
  await moveToDir({ dirPathTemplate, dirpath, name });

  // Remove temp directory
  await Deno.remove(`${dirPathTemp}`, { recursive: true });

  logger.info("added svc-hello template", { name, dirpath, template });
}

type moveToDirOptions = {
  dirPathTemplate: string;
  name: string;
  dirpath: string;
};

async function moveToDir(options: moveToDirOptions) {
  const { dirPathTemplate, dirpath, name } = options;

  // Move api/ files
  const sourceDirApi = `${dirPathTemplate}/src/api/${name}s/`;
  const destinyDirApi = `${dirpath}/src/api/${name}s/`;
  await Deno.rename(sourceDirApi, destinyDirApi);

  // Move module/ files
  const sourceDirModule = `${dirPathTemplate}/src/modules/${name}s/`;
  const destinyDirModule = `${dirpath}/src/modules/${name}s/`;
  await Deno.rename(sourceDirModule, destinyDirModule);
}
