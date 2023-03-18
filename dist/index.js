#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generator_1 = require("./lib/generator");
const program = new commander_1.Command();
program.option("-n, --name <module>");
program.parse(process.argv);
const options = program.opts();
const mod = options.name;
(0, generator_1.generateModule)(mod);
