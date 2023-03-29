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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModule = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const glob_1 = __importDefault(require("glob"));
const handlebars_1 = require("./handlebars");
const templateDir = path.join(process.cwd(), "templates");
function generateModule(name) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const files = yield (0, glob_1.default)("**/*.hbs", globOptions);
        files.forEach((file) => {
            const filenamedParsed = path.parse(file);
            const filename = `${name}.${filenamedParsed.name}.ts`;
            const fileRoute = path.join(name, filenamedParsed.dir, filename);
            const template = fs.readFileSync(`templates/${file}`, "utf-8");
            const compiledTemplate = handlebars_1.Handlebars.compile(template);
            const output = compiledTemplate({ name });
            fs.mkdirSync(path.dirname(fileRoute), { recursive: true });
            fs.writeFileSync(fileRoute, output);
        });
    });
}
exports.generateModule = generateModule;
