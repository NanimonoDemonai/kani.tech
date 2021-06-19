import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageMeta } from "../../../types/PageMeta";

export const pageMetaSlice = createSlice({
  name: "pageMeta",
  initialState: { title: "" } as Partial<PageMeta>,
  reducers: {
    setPageMeta: (state, { payload }: PayloadAction<PageMeta>) => {
      state = payload;
    },
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
    },
  },
});

export const { setPageMeta, setTitle } = pageMetaSlice.actions;
export const pageMetaReducer = pageMetaSlice.reducer;
