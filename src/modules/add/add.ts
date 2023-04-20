import addCrud from "./svc/crud/crud.ts";
import addHello from "./svc/hello.ts";

export function validateConfig(config: any) {}

const mapTemplateToGenerator = new Map();

mapTemplateToGenerator.set("svc-crud", addCrud);
mapTemplateToGenerator.set("svc-hello", addHello);

export async function addByConfig(config: any) {
  return await mapTemplateToGenerator.get(config.type)(config);
}
