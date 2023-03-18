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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handlebars = void 0;
const Handlebars = __importStar(require("handlebars"));
exports.Handlebars = Handlebars;
const inflection = __importStar(require("inflection"));
Handlebars.registerHelper("append", function (str, appendStr) {
    return str + appendStr;
});
Handlebars.registerHelper("camelCase", function (input, type) {
    return `${inflection.camelize(input.replace("-", "_"), true)}${type || ""}`;
});
Handlebars.registerHelper("pluralize", function (input) {
    return inflection.pluralize(input);
});
Handlebars.registerHelper("camelize", function (input) {
    return inflection.pluralize(inflection.camelize(input.replace("-", "_"), true));
});
Handlebars.registerHelper("pascalCase", function (input) {
    return inflection.classify(input.replace("-", "_"));
});
Handlebars.registerHelper("classify", function (input, type) {
    return `${inflection.camelize(input.replace("-", "_"))}${type}`;
});
