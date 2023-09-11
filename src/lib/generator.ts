import * as fs from "fs";
import * as path from "path";
import glob from "glob";
import * as inflection from "inflection";

import { Handlebars } from "./handlebars";

const templateDir = path.join(__dirname.replace(/dist\//, ''), "..", "templates");

async function generateModule(name: string) {
  const globOptions = {
    cwd: templateDir,
    nodir: true,
  };

  const files = await glob("**/*.hbs", globOptions);

  files.forEach((file) => {
    const filenamedParsed = path.parse(file);
    const filename = `${name}.${filenamedParsed.name}.ts`;
    const fileRoute = path.join("src", inflection.pluralize(name), filenamedParsed.dir, filename);
    const template = fs.readFileSync(`${templateDir}/${file}`, "utf-8");
    const compiledTemplate = Handlebars.compile(template);
    const output = compiledTemplate({ name });
    fs.mkdirSync(path.dirname(fileRoute), { recursive: true });
    fs.writeFileSync(fileRoute, output);
  });
}

export { generateModule };
