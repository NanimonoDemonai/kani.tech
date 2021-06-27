import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";

import { gqlClient } from "../../../services/frontend/client/graphqlRequest";
import { AsyncThunkConfig } from "../store";
import { EntryPreviewState } from "../types";

type getPreviewPayload = Omit<EntryPreviewState, "loading">;

const initialState: EntryPreviewState = {
  loading: false,
  code: "",
  images: [],
};

export const getPreview = createAsyncThunk<
  getPreviewPayload,
  { source: string },
  AsyncThunkConfig
>("EntryPreview/getPreview", async ({ source }) => {
  const { getPreview } = await gqlClient.GetPreview({ source });
  if (!getPreview) throw new Error("parsing error");
  const { code, images } = getPreview;
  return { code, images };
});

export const EntryPreviewSlice = createSlice({
  name: "EntryPreview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPreview.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPreview.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = payload.code;
        state.images = payload.images;
      })
      .addCase(getPreview.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const EntryPreviewReducer: Reducer<EntryPreviewState> =
  EntryPreviewSlice.reducer;
