import { PageOption } from "./slices/pageOptionSlice";
import { useSelector } from "./store";

export const usePageOption = (): PageOption =>
  useSelector((state) => state.pageOption);
