import globby from "globby";
import { path as cwd } from "app-root-path";

export const getFilesByGlob = (matchPattern: string): Promise<string[]> =>
  globby(matchPattern, { cwd });
