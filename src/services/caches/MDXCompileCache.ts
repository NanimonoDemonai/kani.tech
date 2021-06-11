import LRUCache from "lru-cache";
import { FrontMatter } from "../../types/FrontMatter";
import { sourceParser } from "../../utils/parsers/sourceParser";

interface CacheValue {
  code: string;
  frontMatter: FrontMatter;
}

const MDXCompileCache = new LRUCache<string, CacheValue>(10000);

const setMDXCompileCache = (
  pid: string,
  revision: number,
  value: CacheValue
): void => {
  MDXCompileCache.set(`${pid}/${revision}`, value);
};

const getMDXCompileCacheWithModified = (
  pid: string,
  revision: number
): CacheValue | undefined => {
  const data = MDXCompileCache.get(`${pid}/${revision}`);
  if (!data) return undefined;
  return data;
};

export const getOrSetMDXCompileCache = async (
  pid: string,
  revision: number,
  source: string
): Promise<CacheValue | undefined> => {
  const data = getMDXCompileCacheWithModified(pid, revision);
  if (data) return data;
  const newData = await sourceParser(source);
  if (!newData) return undefined;
  setMDXCompileCache(pid, revision, newData);
  return newData;
};
