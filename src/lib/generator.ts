import * as fs from "fs";
import * as path from "path";

import { Handlebars } from "./handlebars";

async function generateModule(name: string) {
  const templateDir = path.join(process.cwd(), "templates");
  const moduleDir = path.join(process.cwd(), name);

  fs.mkdirSync(moduleDir);
  fs.mkdirSync(path.join(moduleDir, "domain"));
  fs.mkdirSync(path.join(moduleDir, "domain/entities"));
  fs.mkdirSync(path.join(moduleDir, "domain/interfaces"));
  fs.mkdirSync(path.join(moduleDir, "infrastructure"));
  fs.mkdirSync(path.join(moduleDir, "infrastructure/database"));
  fs.mkdirSync(path.join(moduleDir, "infrastructure/database/models"));
  fs.mkdirSync(path.join(moduleDir, "infrastructure/database/repositories"));
  fs.mkdirSync(path.join(moduleDir, "infrastructure/database/services"));
  fs.mkdirSync(path.join(moduleDir, "infrastructure/http"));
  fs.mkdirSync(path.join(moduleDir, "infrastructure/http/controllers"));
  fs.mkdirSync(path.join(moduleDir, "infrastructure/http/dtos"));

  const files = [
    {
      from: "domain/entities/entity.hbs",
      to: `domain/entities/${name}.entity.ts`,
    },
    {
      from: "domain/interfaces/interface.hbs",
      to: `domain/interfaces/${name}.interface.ts`,
    },
    {
      from: "infrastructure/http/controllers/controller.hbs",
      to: `infrastructure/http/controllers/${name}.controller.ts`,
    },
    {
      from: "infrastructure/database/models/model.hbs",
      to: `infrastructure/database/models/${name}.model.ts`,
    },
    {
      from: "infrastructure/database/repositories/repository.hbs",
      to: `infrastructure/database/repositories/${name}.repository.ts`,
    },
    {
      from: "infrastructure/database/services/service.hbs",
      to: `infrastructure/database/services/${name}.service.ts`,
    },
    { from: "module.hbs", to: `${name}.module.ts` },
  ];

  for (const file of files) {
    const template = fs.readFileSync(
      path.join(templateDir, file.from),
      "utf-8"
    );

    const compiledTemplate = Handlebars.compile(template);
    const output = compiledTemplate({ name });
    fs.writeFileSync(path.join(moduleDir, file.to), output);
  }
}

export { generateModule };
