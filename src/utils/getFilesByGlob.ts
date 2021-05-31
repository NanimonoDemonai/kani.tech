import globby from "globby";

export const getFilesByGlob = (matchPattern: string): Promise<string[]> =>
  globby(matchPattern);
