import * as Handlebars from "handlebars";
import * as inflection from "inflection";

Handlebars.registerHelper("append", function (str: string, appendStr: string) {
  return str + appendStr;
});

Handlebars.registerHelper("camelCase", function (input: string, type: string) {
  return `${inflection.camelize(input.replace("-", "_"), true)}${type || ""}`;
});

Handlebars.registerHelper("pluralize", function (input: string) {
  return inflection.pluralize(input);
});

Handlebars.registerHelper("camelize", function (input: string) {
  return inflection.pluralize(
    inflection.camelize(input.replace("-", "_"), true)
  );
});

Handlebars.registerHelper("pascalCase", function (input: string) {
  return inflection.classify(input.replace("-", "_"));
});

Handlebars.registerHelper("classify", function (input: string, type: string) {
  return `${inflection.camelize(input.replace("-", "_"))}${type}`;
});

export { Handlebars };
