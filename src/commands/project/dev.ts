import { $, CliContext, defineCommand } from "../../../deps.ts";

export default defineCommand({
  key: "dev",
  description: "Maps to 'deno task dev'",
  action: async (_ctx: CliContext) => {
    await $`deno task dev`;
  },
});
