import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageMeta } from "../../../types/PageMeta";

const initialState: PageMeta = {
  modified: "",
  pageName: "",
  revision: 0,
  revisions: [],
  source: "",
  tags: [],
  title: "",
};
export const pageMetaSlice = createSlice({
  name: "pageMeta",
  initialState,
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
