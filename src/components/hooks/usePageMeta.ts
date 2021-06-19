import { PageMeta, Revision } from "../../types/PageMeta";
import { useSelector } from "./store";

export const usePageMeta = (): PageMeta =>
  useSelector((state) => state.pageMeta);

export const useTitle = (): string =>
  useSelector((state) => state.pageMeta.title);

export const useModified = (): string =>
  useSelector((state) => state.pageMeta.modified);

export const usePageName = (): string =>
  useSelector((state) => state.pageMeta.pageName);

export const useRevision = (): number =>
  useSelector((state) => state.pageMeta.revision);

export const useSource = (): string =>
  useSelector((state) => state.pageMeta.source);

export const useTags = (): string[] =>
  useSelector((state) => state.pageMeta.tags);
export const useRevisions = (): Revision[] | undefined =>
  useSelector((state) => state.pageMeta.revisions);
