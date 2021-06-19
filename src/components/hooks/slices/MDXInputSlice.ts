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
      state = payload;
    },
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
    },
    setSource: (state, { payload }: PayloadAction<string>) => {
      state.source = payload;
    },
    setTags: (state, { payload }: PayloadAction<string[]>) => {
      state.tags = payload;
    },
  },
});

export const MDXInputSliceReducer = MDXInputSlice.reducer;
export const { setMDXInput, setTitle, setSource, setTags } =
  MDXInputSlice.actions;
