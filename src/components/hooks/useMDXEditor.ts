import { useSelector } from "./store";

export const useSource = (): string =>
  useSelector((state) => state.MDXInput?.source || "");
export const useTitle = (): string =>
  useSelector((state) => state.MDXInput?.title || "");
export const useTags = (): string[] =>
  useSelector((state) => state.MDXInput?.tags || []);
export const useDisabled = (): boolean =>
  useSelector((state) => state.MDXInput?.loading || true);
