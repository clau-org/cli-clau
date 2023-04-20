import { defineCommandLineInterface } from "../deps.ts";
import commandInit from "./commands/init.ts";
import commandAdd from "./commands/add.ts";

import {
  deployProd as commandDeployProd,
  deployStage as commandDeployStage,
} from "./commands/project/deploy.ts";
import commandProjectDev from "./commands/project/dev.ts";
import commandProjectPreview from "./commands/project/preview.ts";
import {
  envProd as commandEnvProd,
  envStage as commandEnvStage,
} from "./commands/project/env.ts";
import {
  test as commandTest,
  testDev as commandTestDev,
} from "./commands/project/test.ts";

const commandsProject = [
  commandEnvStage,
  commandEnvProd,
  commandProjectDev,
  commandProjectPreview,
  commandTest,
  commandTestDev,
  commandDeployStage,
  commandDeployProd,
];

export const commands = [commandInit, commandAdd, ...commandsProject];

export default await defineCommandLineInterface({ commands });
