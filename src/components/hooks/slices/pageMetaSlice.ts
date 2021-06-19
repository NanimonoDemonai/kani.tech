import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageMeta } from "../../../types/PageMeta";

export const pageMetaSlice = createSlice({
  name: "pageMeta",
  initialState: undefined as PageMeta | undefined,
  reducers: {
    setPageMeta: (state, { payload }: PayloadAction<PageMeta>) => {
      state = payload;
    },
  },
});

export const { setPageMeta } = pageMetaSlice.actions;
export const pageMetaReducer = pageMetaSlice.reducer;
