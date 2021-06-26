import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as defaultDispatch,
  useSelector as defaultSelector,
} from "react-redux";
import { uploaderReducer } from "./slices/FileUploaderSlice";
import { MDXInputSliceReducer } from "./slices/MDXInputSlice";
import { pageMetaReducer } from "./slices/pageMetaSlice";
import { pageOptionReducer } from "./slices/pageOptionSlice";
import { RootState } from "./types";

export const store = configureStore({
  reducer: {
    pageMeta: pageMetaReducer,
    pageOption: pageOptionReducer,
    MDXInput: MDXInputSliceReducer,
    Uploader: uploaderReducer,
  },
});
export type Dispatch = typeof store.dispatch;

export const useDispatch = (): Dispatch => defaultDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = defaultSelector;

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: Dispatch;
};
