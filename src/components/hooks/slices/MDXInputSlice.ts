import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { gqlClient } from "../../../services/frontend/client/graphqlRequest";

import { AsyncThunkConfig } from "../store";
import { MDXInputState } from "../types";

type setMDXInputPayload = Omit<MDXInputState, "loading" | "initialized">;

const initialState: MDXInputState = {
  source: "",
  tags: [],
  title: "",
  loading: false,
  initialized: false,
};

export const submitPage = createAsyncThunk<
  void,
  { pageName: string },
  AsyncThunkConfig
>("mdxInput/submitPage", async ({ pageName }, { getState }) => {
  const { MDXInput } = getState();
  if (!MDXInput) return;
  const { title, source, tags } = MDXInput;
  const res = source;
  if (!res) return;
  await gqlClient.PostArticle({
    pageName: pageName,
    pageTitle: title,
    source: res,
    tags,
  });
});

export const MDXInputSlice = createSlice({
  name: "MDXInput",
  initialState,
  reducers: {
    setMDXInput: (
      state,
      { payload: { title, tags, source } }: PayloadAction<setMDXInputPayload>
    ) => {
      state.title = title;
      state.tags = tags;
      state.source = source;
      state.initialized = true;
    },
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
      return state;
    },
    setSource: (state, { payload }: PayloadAction<string>) => {
      state.source = payload;
      return state;
    },
    setTags: (state, { payload }: PayloadAction<string[]>) => {
      state.tags = payload;
      return state;
    },
  },
  extraReducers: {
    [submitPage.pending.type]: (state) => {
      state.loading = true;
    },
    [submitPage.fulfilled.type]: (state) => {
      state.loading = false;
      // TODO: もっといい実装を考える
      location && location.reload();
    },
    [submitPage.rejected.type]: (state) => {
      state.loading = true;
    },
  },
});

export const MDXInputSliceReducer: Reducer<MDXInputState> =
  MDXInputSlice.reducer;
export const { setMDXInput, setTitle, setSource, setTags } =
  MDXInputSlice.actions;
