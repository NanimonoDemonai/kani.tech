import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as defaultDispatch,
  useSelector as defaultSelector,
} from "react-redux";
import { pageMetaReducer } from "./slices/pageMetaSlice";

export const store = configureStore({
  reducer: {
    pageMeta: pageMetaReducer,
  },
});
type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export const useDispatch = () => defaultDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<State> = defaultSelector;
