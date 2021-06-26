import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageMeta } from "../../../types/PageMeta";
import { PageMetaState } from "../types";

const initialState: PageMetaState = {
  modified: "",
  pageName: "",
  revision: 0,
  revisions: [],
  source: "",
  tags: [],
  title: "",
  images: [],
  imageObjects: [],
};
export const pageMetaSlice = createSlice({
  name: "pageMeta",
  initialState,
  reducers: {
    setPageMeta: (state, { payload }: PayloadAction<PageMeta>) => {
      return payload;
    },
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
      return state;
    },
  },
});

export const { setPageMeta, setTitle } = pageMetaSlice.actions;
export const pageMetaReducer = pageMetaSlice.reducer;
