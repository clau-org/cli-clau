import { $, CliContext, defineCommand, defineFlag } from "../../deps.ts";
import { replaceByInDir, replaceNamesInDir, validateOption } from "../utils.ts";

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

const templates = [
  "svc-crud",
  "svc-hello",
  "cli",
];

export default defineCommand({
  key: "init",
  description: "Command for init a new project",
  flags: [name, dirpath, template],
  action: async (ctx: CliContext) => {
    const { logger, program } = ctx;
    const {
      name = "svc",
      dirpath = "",
      template,
    } = program;

    validateOption(template, templates);

    const tempDirPath = await Deno.makeTempDir();
    const cliDir = `${tempDirPath}/.cli-clau`;
    const templateDir = `${cliDir}/.playground/${template}`;

    // Create empty folder
    await Deno.mkdir(cliDir, { recursive: true });

    // Clone repository
    await $`git clone git@github.com:clau-org/mod-core.git ${cliDir}`;

    await replaceByInDir({
      dir: templateDir,
      search: "user",
      replacement: name,
    });

    await replaceNamesInDir({
      dir: templateDir,
      search: "user",
      replacement: name,
    });

    await Deno.rename(templateDir, `${dirpath}`);

    await Deno.remove(`${tempDirPath}`, { recursive: true });

    logger.info("init action", { name, dirpath, template });
  },
});
