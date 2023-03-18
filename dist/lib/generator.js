"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModule = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const handlebars_1 = require("./handlebars");
function generateModule(name) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const template = fs.readFileSync(path.join(templateDir, file.from), "utf-8");
            const compiledTemplate = handlebars_1.Handlebars.compile(template);
            const output = compiledTemplate({ name });
            fs.writeFileSync(path.join(moduleDir, file.to), output);
        }
    });
}
exports.generateModule = generateModule;
