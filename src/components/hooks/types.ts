import { Reducer } from "@reduxjs/toolkit";
import { ImageObject, PageMeta } from "../../types/PageMeta";

export type PageMetaState = PageMeta;

export interface PageOptionState {
  isBottomOptionShow: boolean;
  isBottomOptionShowSource: boolean;
  isBottomOptionShowHistory: boolean;
  isBottomOptionShowEditor: boolean;
  isBottomOptionFileListEditor: boolean;
}

export interface MDXInputState {
  title: string;
  source: string;
  tags: string[];
  loading: boolean;
  initialized: boolean;
}

export interface UploaderState {
  loading: boolean;
  deleting: boolean;
  uploading: boolean;
  objectList: ImageObject[];
}

export interface EntryPreviewState {
  loading: boolean;
  code: string;
  images: ImageObject[];
}

export type RootState = StaticState & Partial<AsyncState>;

export interface StaticState {
  pageMeta: PageMetaState;
  pageOption: PageOptionState;
}

export interface AsyncState {
  MDXInput: MDXInputState;
  Uploader: UploaderState;
  Preview: EntryPreviewState;
}

export type StaticReducer = {
  [P in keyof StaticState]: Reducer<StaticState[P]>;
};
export type AsyncReducer = { [P in keyof AsyncState]: Reducer<AsyncState[P]> };
