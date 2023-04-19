import {
  Action,
  CliContext,
  defineCommand,
  defineFlag,
  validateOption,
} from "../../deps.ts";
import { initNewProject } from "../modules/init.ts";

export const key = "init";
export const description = "Command for init a new project";

export const flagName = defineFlag({
  key: "-n --name",
  required: true,
  description: "Name of project",
});

export const flagDirpath = defineFlag({
  key: "-d --dirpath",
  description: "Directory path where to create the project, default is '.'",
});

export const flagTemplate = defineFlag({
  key: "-t --template",
  required: true,
  description: "Template to use to init the project",
});

export const flags = [flagName, flagDirpath, flagTemplate];

export const action: Action = async (ctx: CliContext) => {
  const { program: { name, dirpath, template } } = ctx;
  const templates = ["svc-crud", "svc-hello", "cli"];

  validateOption(template, templates);

  await initNewProject({ ctx, dirpath, name, template });
};

export default defineCommand({ key, description, flags, action });
