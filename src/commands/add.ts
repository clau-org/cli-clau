import { Action, CliContext, defineCommand, defineFlag } from "../../deps.ts";
import { addCodeToProject, validateConfig } from "../modules/add.ts";

export const key = "add";
export const description = "Command for adding code to an existing project";

export const flagName = defineFlag({
  key: "-c --config",
  required: true,
  description: "Configuration file",
});

export const flags = [flagName];

export const action: Action = async (ctx: CliContext) => {
  const { program: { config } } = ctx;

  validateConfig(config);

  await addCodeToProject({ ctx, config });
};

export default defineCommand({ key, description, flags, action });
