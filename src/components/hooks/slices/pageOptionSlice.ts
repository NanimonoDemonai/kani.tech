import { createSlice } from "@reduxjs/toolkit";

export interface PageOption {
  isBottomOptionShow: boolean;
  isBottomOptionShowSource: boolean;
  isBottomOptionShowHistory: boolean;
  isBottomOptionShowEditor: boolean;
  isBottomOptionFileListEditor: boolean;
}

const initialState: PageOption = {
  isBottomOptionShow: false,
  isBottomOptionFileListEditor: false,
  isBottomOptionShowEditor: false,
  isBottomOptionShowHistory: false,
  isBottomOptionShowSource: false,
};
export const pageOptionSlice = createSlice({
  name: "pageOption",
  initialState,
  reducers: {
    toggleBottomOptionShow: (state) => {
      if (state.isBottomOptionShow) {
        state = initialState;
      } else {
        state.isBottomOptionShow = true;
      }
    },
    toggleBottomOptionShowSource: (state) => {
      state.isBottomOptionShowSource = !state.isBottomOptionShowSource;
    },
    toggleBottomOptionShowHistory: (state) => {
      state.isBottomOptionShowHistory = !state.isBottomOptionShowHistory;
    },
    toggleBottomOptionShowEditor: (state) => {
      state.isBottomOptionShowEditor = !state.isBottomOptionShowEditor;
    },
    toggleBottomOptionFileListEditor: (state) => {
      state.isBottomOptionFileListEditor = !state.isBottomOptionFileListEditor;
    },
  },
});

export const pageOptionReducer = pageOptionSlice.reducer;
export const {
  toggleBottomOptionShowEditor,
  toggleBottomOptionFileListEditor,
  toggleBottomOptionShowSource,
  toggleBottomOptionShow,
  toggleBottomOptionShowHistory,
} = pageOptionSlice.actions;
