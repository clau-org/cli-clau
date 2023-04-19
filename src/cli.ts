import { defineCommandLineInterface } from "../deps.ts";
import commandInit from "./commands/init.ts";

export default await defineCommandLineInterface({ commands: [commandInit] });
