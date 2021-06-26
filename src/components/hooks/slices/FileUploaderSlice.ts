import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  Reducer,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { uploaderTimeout } from "../../../constants/timeout";
import { uploadImage } from "../../../services/backend/uploadImage";
import { gqlClient } from "../../../services/frontend/client/graphqlRequest";
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
  getObjectList
    .filter(
      (e) =>
        e.verified === "PENDING" &&
        dayjs().diff(dayjs(e.modified), "minute") > uploaderTimeout
    )
    .forEach((e) => {
      gqlClient.UpdateObjectStatus({ key: e.key, isError: true });
    });
  return getObjectList;
});

export const uploadFile = createAsyncThunk<
  void,
  uploadFileProps,
  AsyncThunkConfig
>("uploadFile", async ({ file }, { getState, dispatch }) => {
  const {
    pageMeta: { pageName, imageObjects },
  } = getState();
  const key = `${pageName}/${file.name}`;
  if (imageObjects.some((e) => e.key === key)) return;
  try {
    const res = await uploadImage(file, pageName);
    if (res) await gqlClient.UpdateObjectStatus({ key });
  } catch (e) {
    await gqlClient.UpdateObjectStatus({ key, isError: true });
  }
  dispatch(loadObject());
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
    function asyncCase<T>(
      thunk: AsyncThunk<void, T, AsyncThunkConfig>,
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
