import addCrud from "./svc/crud/crud.ts";
import { CliContext } from "https://raw.githubusercontent.com/clau-org/mod-core/v0.0.11/mod.ts";

export function validateConfig(config: any) {}

const mapTemplateToGenerator = new Map();

mapTemplateToGenerator.set("svc-crud", addCrud);

export type addByConfigOptions = {
  config: any;
  ctx: CliContext;
};
export async function addByConfig(options: addByConfigOptions) {
  const { config, ctx } = options;
  return await mapTemplateToGenerator.get(config.template)({ config, ctx });
}
