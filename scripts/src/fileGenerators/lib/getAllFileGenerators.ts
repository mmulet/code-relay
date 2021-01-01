import { readdir } from "fs/promises";
import { resolve, basename, extname } from "path";
import FileGenerator from "./FileGenerator";

export default async (atPath: string) =>
  (
    await readdir(atPath, {
      withFileTypes: true,
    })
  )
    .filter((entry) => {
      if (!entry.isFile()) {
        return false;
      }
      switch (extname(entry.name)) {
        case ".jsx":
        case ".tsx":
        case ".js":
        case ".ts":
        case ".mjs":
          return true;
        default:
          return false;
      }
    })
    .map(({ name }) => ({
      moduleName: name,
      fileGenerator: require(resolve(
        atPath,
        basename(name, extname(name))
      ))["default"] as FileGenerator,
    }));
