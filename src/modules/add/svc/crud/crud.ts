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
      template,
      name = "user",
      dirpath = Deno.cwd(),
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

  // Replace name in files (content and name/path)
  await replaceInFiles({
    dir: dirPathTemplate,
    search: "user",
    replacement: name,
  });

  // Get specific files to update
  const filePathApiCreate = `${dirPathTemplate}/src/api/${name}/create.ts`;

  // Generate validation code
  await generateValidations(filePathApiCreate);

  //Move to directory selected
  await moveToDir({ dirPathTemp, dirPathTemplate, dirpath });

  logger.info("added svc-hello template", { name, dirpath, template });
}

type moveToDirOptions = {
  dirPathTemplate: string;
  dirpath: string;
  dirPathTemp: string;
};

async function moveToDir(options: moveToDirOptions) {
  const { dirPathTemp, dirpath } = options;

  // Move api/ files

  // Move module/ files

  // Remove temp directory
  await Deno.remove(`${dirPathTemp}`, { recursive: true });
}
