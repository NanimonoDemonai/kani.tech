import {
  configureStore as configureReduxToolkitStore,
  combineReducers,
  Store,
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as defaultDispatch,
  useSelector as defaultSelector,
  useStore,
} from "react-redux";
import { pageMetaReducer } from "./slices/pageMetaSlice";
import { pageOptionReducer } from "./slices/pageOptionSlice";
import { AsyncReducer, RootState, StaticReducer } from "./types";

const staticReducer: StaticReducer = {
  pageMeta: pageMetaReducer,
  pageOption: pageOptionReducer,
};

const asyncReducer: Partial<AsyncReducer> = {};

export const store = configureReduxToolkitStore({
  reducer: staticReducer,
});
export const useInjectReducer = (state: Partial<AsyncReducer>): void => {
  const store = useStore();
  injectReducer(store, state);
};
export const injectReducer = (
  store: Store,
  state: Partial<AsyncReducer>
): void => {
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
