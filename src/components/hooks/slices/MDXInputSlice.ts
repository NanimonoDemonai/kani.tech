import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MDXInputState {
  title: string;
  source: string;
  tags: string[];
}

const initialState: MDXInputState = { source: "", tags: [], title: "" };

export const MDXInputSlice = createSlice({
  name: "MDXInput",
  initialState,
  reducers: {
    setMDXInput: (state, { payload }: PayloadAction<MDXInputState>) => {
      return payload;
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
});

export const MDXInputSliceReducer = MDXInputSlice.reducer;
export const { setMDXInput, setTitle, setSource, setTags } =
  MDXInputSlice.actions;
