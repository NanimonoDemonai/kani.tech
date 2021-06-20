import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  Reducer,
} from "@reduxjs/toolkit";
import { gqlClient } from "../../../services/client/graphqlRequest";
import { AsyncThunkConfig } from "../store";

interface uploadFileProps {
  file: File;
}

interface deleteFileProps {
  key: string;
}

interface State {
  loading: boolean;
  deleting: boolean;
  uploading: boolean;
  objectList: string[];
}

const initialState: State = {
  loading: false,
  deleting: false,
  uploading: false,
  objectList: [],
};

export const loadObject = createAsyncThunk<string[], void, AsyncThunkConfig>(
  "loadObject",
  async (_, { getState }) => {
    const {
      pageMeta: { pageName },
    } = getState();
    const { getObjectList } = await gqlClient.GetObjectList({ key: pageName });
    return getObjectList;
  }
);

export const uploadFile = createAsyncThunk<
  void,
  uploadFileProps,
  AsyncThunkConfig
>("uploadFile", async ({ file }, { getState, dispatch }) => {
  const {
    pageMeta: { pageName },
  } = getState();

  const { getUploadUrl: url } = await gqlClient.GetUploadUrl({
    contentType: file.type,
    key: `${pageName}/${file.name}`,
  });
  if (!url) return;
  await fetch(url, {
    method: "put",
    body: file,
    headers: { "Content-Type": file.type },
  });

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
      target: keyof Omit<State, "objectList">
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
export const uploaderReducer: Reducer<State> = uploaderSlice.reducer;
