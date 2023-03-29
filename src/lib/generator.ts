import * as fs from "fs";
import * as path from "path";
import glob from "glob";

import { Handlebars } from "./handlebars";
import { getOutputPath } from "../utils/output-path";

const templateDir = path.join(process.cwd(), "templates");

async function generateModule(name: string) {
  const moduleDir = path.join(process.cwd(), name);
  const directories = [
    "domain",
    "domain/entities",
    "domain/interfaces",
    "infrastructure",
    "infrastructure/database",
    "infrastructure/database/models",
    "infrastructure/database/repositories",
    "infrastructure/database/services",
    "infrastructure/http",
    "infrastructure/http/controllers",
    "infrastructure/http/dtos",
  ];

  directories.forEach((dir) => {
    const dirPath = path.join(moduleDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  const globOptions = {
    cwd: templateDir,
    nodir: true,
  };

  const files = await glob("**/*.hbs", globOptions);

  files.forEach((file) => {
    const filenamedParsed = path.parse(file);
    const filename = `${name}.${filenamedParsed.name}.ts`;
    const fileRoute = path.join(name, filenamedParsed.dir, filename);
    const template = fs.readFileSync(`templates/${file}`, "utf-8");
    const compiledTemplate = Handlebars.compile(template);
    const output = compiledTemplate({ name });
    fs.mkdirSync(path.dirname(fileRoute), { recursive: true });
    fs.writeFileSync(fileRoute, output);
  });
}

export { generateModule };
