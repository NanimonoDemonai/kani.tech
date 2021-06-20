import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import axios from "axios";
import { gqlClient } from "../../../services/client/graphqlRequest";
import { AsyncThunkConfig } from "../store";

interface uploadFileProps {
  pageName: string;
  file: File;
}

interface State {
  uploading: boolean;
}

const initialState: State = {
  uploading: false,
};

export const uploadFile = createAsyncThunk<
  void,
  uploadFileProps,
  AsyncThunkConfig
>("uploadFile", async ({ pageName, file }, { getState }) => {
  const { Uploader } = getState();
  if (Uploader.uploading) return;
  const { getUploadUrl: url } = await gqlClient.GetUploadUrl({
    contentType: file.type,
    key: `${pageName}/${file.name}`,
  });
  if (!url) return;
  await axios.request({
    method: "put",
    url,
    data: file,
    headers: { "Content-Type": file.type },
  });
});

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state) => {
      state.uploading = false;
    });
    builder.addCase(uploadFile.rejected, (state) => {
      state.uploading = false;
    });
  },
});

export const uploaderReducer: Reducer<State> = uploaderSlice.reducer;
