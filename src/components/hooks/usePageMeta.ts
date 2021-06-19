import { PageMeta, Revision } from "../../types/PageMeta";
import { useSelector } from "./store";

export const usePageMeta = (): PageMeta | undefined =>
  useSelector((state) => state.pageMeta);

export const useModified = (): string | undefined =>
  useSelector((state) => state.pageMeta?.modified);

export const usePageName = (): string | undefined =>
  useSelector((state) => state.pageMeta?.pageName);

export const useRevision = (): number | undefined =>
  useSelector((state) => state.pageMeta?.revision);

export const useRevisions = (): Revision[] | undefined =>
  useSelector((state) => state.pageMeta?.revisions);
