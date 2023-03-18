#!/usr/bin/env node
import { Command } from "commander";
import { generateModule } from "./lib/generator";

const program = new Command();

program.option("-n, --name <module>");
program.parse(process.argv);

const options = program.opts();
const mod = options.name;

generateModule(mod);
