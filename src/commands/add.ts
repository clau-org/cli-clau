import { Action, CliContext, defineCommand, defineFlag } from "../../deps.ts";
import { addByConfig, validateConfig } from "..//modules/add/add.ts";

export const key = "add";
export const description = "Command for adding code to an existing project";
export const flagName = defineFlag({
  key: "-c --config",
  required: true,
  description: "Configuration file",
});

export const flags = [flagName];

export const action: Action = async (ctx: CliContext) => {
  const { program: { config: pathFileConfig } } = ctx;

  // validateConfig(config);

  // Read config file
  const config = JSON.parse(await Deno.readTextFile(pathFileConfig));

  await addByConfig({ config, ctx });
};

export default defineCommand({ key, description, flags, action });
