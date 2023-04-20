import { $, CliContext, defineCommand } from "../../../deps.ts";
export default defineCommand({
  key: "fmt",
  description: "Maps to 'deno fmt'",
  action: async (_ctx: CliContext) => {
    await $`deno fmt`;
  },
});
