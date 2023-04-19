import {
  $,
  CliContext,
  defineCommand,
  defineFlag,
  validateOption,
} from "../../deps.ts";
import { replaceByInDir, replaceNamesInDir } from "../utils.ts";

const name = defineFlag({
  key: "-n --name",
  required: true,
  description: "Name of project",
});

const dirpath = defineFlag({
  key: "-d --dirpath",
  description: "Directory path where to create the project, default is '.'",
});

const template = defineFlag({
  key: "-t --template",
  required: true,
  description: "Template to use to init the project",
});

const templates = ["svc-crud", "svc-hello", "cli"];

export default defineCommand({
  key: "init",
  description: "Command for init a new project",
  flags: [name, dirpath, template],
  action: async (ctx: CliContext) => {
    const { logger, program } = ctx;
    const {
      name = "svc",
      dirpath = Deno.cwd(),
      template,
    } = program;

    // Validate options
    validateOption(template, templates);

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
  },
});
