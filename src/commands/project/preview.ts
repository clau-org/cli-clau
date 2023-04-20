import { $, CliContext, defineCommand } from "../../../deps.ts";
export default defineCommand({
  key: "preview",
  description: "Maps to 'deno task preview'",
  action: async (_ctx: CliContext) => {
    await $`deno task preview`;
  },
});
