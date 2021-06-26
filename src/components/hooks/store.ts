import {
  configureStore as configureReduxToolkitStore,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as defaultDispatch,
  useSelector as defaultSelector,
  useStore,
} from "react-redux";
import { uploaderReducer } from "./slices/FileUploaderSlice";
import { pageMetaReducer } from "./slices/pageMetaSlice";
import { pageOptionReducer } from "./slices/pageOptionSlice";
import { AsyncReducer, RootState } from "./types";

const staticReducer = {
  pageMeta: pageMetaReducer,
  pageOption: pageOptionReducer,
  Uploader: uploaderReducer,
};
const asyncReducer: Partial<AsyncReducer> = {};

export const store = configureReduxToolkitStore({
  reducer: staticReducer,
});
export const useInjectReducer = (state: Partial<AsyncReducer>): void => {
  const store = useStore();
  Object.entries(state).forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    asyncReducer[key] = value;
  });
  store.replaceReducer(
    combineReducers({
      ...staticReducer,
      ...asyncReducer,
    })
  );
};

export type Dispatch = typeof store.dispatch;

export const useDispatch = (): Dispatch => defaultDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = defaultSelector;

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: Dispatch;
};
