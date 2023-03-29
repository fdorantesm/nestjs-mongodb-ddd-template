import * as path from "path";

export function getOutputPath(
  name: string,
  templateDir: string,
  moduleDir: string,
  file: string
): string {
  const relativePath = path.relative(templateDir, file);
  const outputPath = path.join(name, relativePath);
  const outputFileName = outputPath.replace(/\.hbs$/, ".ts");
  return path.join(moduleDir, outputFileName);
}
