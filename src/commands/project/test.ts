import { $, CliContext, defineCommand } from "../../../deps.ts";
export const test = defineCommand({
  key: "test",
  description: "Maps to 'deno task test'",
  action: async (_ctx: CliContext) => {
    await $`deno task test`;
  },
});

export const testDev = defineCommand({
  key: "test:dev",
  description: "Maps to 'deno task test:dev'",
  action: async (_ctx: CliContext) => {
    await $`deno task test:dev`;
  },
});
