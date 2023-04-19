import { defineCommandLineInterface } from "../deps.ts";
import commandInit from "./commands/init.ts";
import commandAdd from "./commands/add.ts";

export const commands = [commandInit, commandAdd];

export default await defineCommandLineInterface({ commands });
