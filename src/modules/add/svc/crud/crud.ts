import { CliContext } from "https://raw.githubusercontent.com/clau-org/mod-core/v0.0.11/mod.ts";
import $ from "https://deno.land/x/dax@0.30.1/mod.ts";
import { replaceInFiles } from "../../../utils.ts";
import { generateValidations } from "./validations.ts";
import { join } from "https://deno.land/std@0.116.0/path/mod.ts";

export type addRouterCrudOptions = {
  config: any;
  ctx: CliContext;
};

export default async function (options: addRouterCrudOptions) {
  const {
    config: { name = "user", template, dirpath = Deno.cwd(), props },
    ctx: { logger },
  } = options;

  // Get tmp dir
  const dirPathTemp = await Deno.makeTempDir();

  try {
    const dirPathCli = join(dirPathTemp, ".cli-clau");
    const dirPathTemplate = join(dirPathCli, ".playground", template);

    // Download template
    await Deno.mkdir(dirPathCli, { recursive: true });
    await $`git clone git@github.com:clau-org/mod-core.git ${dirPathCli}`;

    // Generate validation code
    const filePathApiCreate = join(
      dirPathTemplate,
      "src",
      "api",
      "users",
      "create.ts",
    );
    await generateValidations({ path: filePathApiCreate, props });

    // Replace name in files (content and name/path)
    await replaceInFiles({
      dir: dirPathTemplate,
      search: "user",
      replacement: name,
    });

    // Move to directory selected
    await moveToDirs({ dirPathTemplate, dirpath, name });
  } finally {
    // Remove temp directory
    await Deno.remove(`${dirPathTemp}`, { recursive: true });
  }

  logger.info("added svc-hello template", { name, dirpath, template });
}

type moveToDirOptions = {
  dirPathTemplate: string;
  name: string;
  dirpath: string;
};

async function moveToDirs(options: moveToDirOptions) {
  const { dirPathTemplate, dirpath, name } = options;

  // Move api/ files
  const sourceDirApi = join(dirPathTemplate, "src", "api", `${name}s`);
  const destinyDirApi = join(dirpath, "src", "api", `${name}s`);
  await Deno.rename(sourceDirApi, destinyDirApi);

  // Move module/ files
  const sourceDirModule = join(dirPathTemplate, "src", "modules", `${name}s`);
  const destinyDirModule = join(dirpath, "src", "modules", `${name}s`);
  await Deno.rename(sourceDirModule, destinyDirModule);
}
