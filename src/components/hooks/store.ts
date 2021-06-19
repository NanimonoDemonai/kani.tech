import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as defaultDispatch,
  useSelector as defaultSelector,
} from "react-redux";
import { MDXInputSliceReducer } from "./slices/MDXInputSlice";
import { pageMetaReducer } from "./slices/pageMetaSlice";
import { pageOptionReducer } from "./slices/pageOptionSlice";

export const store = configureStore({
  reducer: {
    pageMeta: pageMetaReducer,
    pageOption: pageOptionReducer,
    MDXInput: MDXInputSliceReducer,
  },
});
type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export const useDispatch = () => defaultDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<State> = defaultSelector;
