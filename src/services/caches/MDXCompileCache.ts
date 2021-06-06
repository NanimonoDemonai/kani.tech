import LRUCache from "lru-cache";
import { PageMeta } from "../../types/PageMeta";

interface CacheValue {
  code: string;
  pageMeta: PageMeta;
}

const MDXCompileCache = new LRUCache<string, CacheValue>(10000);

const setMDXCompileCache = (pid: string, value: CacheValue): void => {
  MDXCompileCache.set(pid, value);
};

const getMDXCompileCacheWithModified = (
  pid: string,
  modified: string
): CacheValue | undefined => {
  const data = MDXCompileCache.get(pid);
  if (!data) return undefined;
  if (data.pageMeta.modified !== modified) {
    MDXCompileCache.del(pid);
    return undefined;
  }
  return data;
};

export const getOrSetMDXCompileCache = async (
  pid: string,
  modified: string,
  setter: () => Promise<CacheValue | undefined>
): Promise<CacheValue | undefined> => {
  const data = getMDXCompileCacheWithModified(pid, modified);
  if (data) return data;

  const newData = await setter();
  if (!newData) return undefined;
  setMDXCompileCache(pid, newData);
  return newData;
};
