import { Cli, CliCommand, ActionContext } from "./deps.ts";

const clau = new Cli({
  name: "CLAU",
});

const commandInit = new CliCommand("init");

commandInit.addFlag({
  key: "-s --some",
  description: "some description",
  required: true,
});

commandInit.setAction((ctx: ActionContext) => {
  const { logger, program } = ctx;

  logger.info("action", program.some);
});

clau.addCommand(commandInit);

export { clau };
