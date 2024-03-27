import { readFileSync } from "fs";

export const getFile = (filePath: string): Buffer => Buffer.from(readFileSync(__dirname + filePath, "utf-8"));