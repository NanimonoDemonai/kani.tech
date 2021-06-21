import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { gqlClient } from "../../../services/client/graphqlRequest";
import { AsyncThunkConfig } from "../store";

export interface MDXInputState {
  title: string;
  source: string;
  tags: string[];
  loading: boolean;
}

type setMDXInputPayload = Omit<MDXInputState, "loading">;

const initialState: MDXInputState = {
  source: "",
  tags: [],
  title: "",
  loading: false,
};

export const submitPage = createAsyncThunk<
  void,
  { pageName: string },
  AsyncThunkConfig
>("mdxInput/submitPage", async ({ pageName }, { getState }) => {
  const {
    MDXInput: { title, source, tags },
  } = getState();
  await gqlClient.PostArticle({
    pageName: pageName,
    pageTitle: title,
    source: source,
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
