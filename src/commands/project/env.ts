import { $, CliContext, defineCommand } from "../../../deps.ts";

export const envStage = defineCommand({
  key: "env:stage",
  description: "Maps to 'deno task env:stage'",
  action: async (_ctx: CliContext) => {
    await $`deno task env:stage`;
  },
});

export const envProd = defineCommand({
  key: "env:prod",
  description: "Maps to 'deno task env:prod'",
  action: async (_ctx: CliContext) => {
    await $`deno task env:prod`;
  },
});
