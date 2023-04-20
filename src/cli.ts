import { defineCommandLineInterface } from "../deps.ts";
import commandInit from "./commands/init.ts";
import commandAdd from "./commands/add.ts";
import {
  deployProd as commandProjectDeployProd,
  deployStage as commandProjectDeployStage,
} from "./commands/project/deploy.ts";
import commandProjectDev from "./commands/project/dev.ts";
import commandProjectPreview from "./commands/project/preview.ts";
import commandProjectFmt from "./commands/project/fmt.ts";
import {
  envProd as commandProjectEnvProd,
  envStage as commandProjectEnvStage,
} from "./commands/project/env.ts";
import {
  test as commandProjectTest,
  testDev as commandProjectTestDev,
} from "./commands/project/test.ts";

const commandsProject = [
  commandProjectFmt,
  commandProjectEnvStage,
  commandProjectEnvProd,
  commandProjectDev,
  commandProjectPreview,
  commandProjectTest,
  commandProjectTestDev,
  commandProjectDeployStage,
  commandProjectDeployProd,
];

export const commands = [commandInit, commandAdd, ...commandsProject];

export default await defineCommandLineInterface({ commands });
