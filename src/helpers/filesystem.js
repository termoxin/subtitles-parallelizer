import { promises as fs } from "fs";

export const getFileContent = (path) => fs.readFile(path, "utf-8");
