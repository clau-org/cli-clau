import { $, CliContext, defineCommand } from "../../../deps.ts";

export const deployStage = defineCommand({
  key: "deploy:stage",
  description: "Maps to 'deno task deploy:stage'",
  action: async (_ctx: CliContext) => {
    await $`deno task deploy:stage`;
  },
});

export const deployProd = defineCommand({
  key: "deploy:prod",
  description: "Maps to 'deno task deploy:prod'",
  action: async (_ctx: CliContext) => {
    await $`deno task deploy:prod`;
  },
});
