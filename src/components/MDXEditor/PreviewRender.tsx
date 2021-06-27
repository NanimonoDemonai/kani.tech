import { useEffect, VFC } from "react";
import {
  EntryPreviewReducer,
  getPreview,
} from "../hooks/slices/EntriPreviewState";
import { useDispatch, useInjectReducer, useSelector } from "../hooks/store";

export const PreviewRender: VFC<{ source: string }> = ({ source }) => {
  useInjectReducer({ Preview: EntryPreviewReducer });
  const initialized = useSelector((state) => !!state.Preview);

  const dispatch = useDispatch();
  useEffect(() => {
    if (initialized) dispatch(getPreview({ source }));
  }, [dispatch, source, initialized]);

  return null;
};
