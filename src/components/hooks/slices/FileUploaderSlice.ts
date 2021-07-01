import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  Reducer,
} from "@reduxjs/toolkit";
import { gqlClient } from "../../../services/frontend/client/graphqlRequest";
import { uploadImage } from "../../../services/frontend/uploadImage";
import { ImageObject } from "../../../types/PageMeta";
import { AsyncThunkConfig } from "../store";
import { UploaderState } from "../types";

interface uploadFileProps {
  file: File;
}

interface deleteFileProps {
  key: string;
}

const initialState: UploaderState = {
  loading: false,
  deleting: false,
  uploading: false,
  objectList: [],
};

export const loadObject = createAsyncThunk<
  ImageObject[],
  void,
  AsyncThunkConfig
>("loadObject", async (_, { getState }) => {
  const {
    pageMeta: { pageName },
  } = getState();
  const { getObjectList } = await gqlClient.GetObjectList({
    keyPrefix: pageName,
  });

  return getObjectList;
});

export const uploadFile = createAsyncThunk<
  string,
  uploadFileProps,
  AsyncThunkConfig
>("uploadFile", async ({ file }, { getState, dispatch }) => {
  const {
    pageMeta: { pageName, imageObjects },
  } = getState();
  const key = `${pageName}/${file.name}`;
  if (imageObjects.some((e) => e.key === key)) throw new Error("already exist");

  const res = await uploadImage(file, pageName);
  dispatch(loadObject());
  return res ?? "";
});

export const deleteFile = createAsyncThunk<
  void,
  deleteFileProps,
  AsyncThunkConfig
>("deleteFile", async ({ key: key }, { dispatch }) => {
  await gqlClient.DeleteObject({ key });
  dispatch(loadObject());
});

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    function asyncCase<T, K>(
      thunk: AsyncThunk<T, K, AsyncThunkConfig>,
      target: keyof Omit<UploaderState, "objectList">
    ) {
      builder
        .addCase(thunk.pending, (state) => {
          state[target] = true;
        })
        .addCase(thunk.fulfilled, (state) => {
          state[target] = false;
        })
        .addCase(thunk.rejected, (state) => {
          state[target] = false;
        });
    }

    asyncCase(uploadFile, "uploading");
    asyncCase(deleteFile, "deleting");

    builder
      .addCase(loadObject.pending, (state) => {
        state.loading = true;
        state.objectList = [];
      })
      .addCase(loadObject.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.objectList = payload;
      })
      .addCase(loadObject.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const uploaderReducer: Reducer<UploaderState> = uploaderSlice.reducer;
