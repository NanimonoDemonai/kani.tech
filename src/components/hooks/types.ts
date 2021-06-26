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
}
export interface UploaderState {
  loading: boolean;
  deleting: boolean;
  uploading: boolean;
  objectList: ImageObject[];
}

export interface RootState extends Partial<AsyncState> {
  pageMeta: PageMetaState;
  pageOption: PageOptionState;
}

export interface AsyncState {
  MDXInput: MDXInputState;
}

export interface AsyncReducer {
  MDXInput: Reducer<MDXInputState>;
}
