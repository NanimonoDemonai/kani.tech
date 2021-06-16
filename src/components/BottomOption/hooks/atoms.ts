// eslint-disable-next-line import/named
import { atom, RecoilState, useRecoilCallback, useRecoilState } from "recoil";

export const getUseToggleOption =
  (atom: RecoilState<boolean>): (() => [boolean, () => void]) =>
  () => {
    const [isShow, setShow] = useRecoilState(atom);
    const toggle = useRecoilCallback(
      () => () => {
        setShow(!isShow);
      },
      [isShow, setShow]
    );
    return [isShow, toggle];
  };

const isBottomOptionShowAtom = atom<boolean>({
  key: "isBottomOptionShow",
  default: false,
});

const isBottomOptionShowSourceAtom = atom<boolean>({
  key: "isBottomOptionShowSource",
  default: false,
});

const isBottomOptionShowHistoryAtom = atom<boolean>({
  key: "isBottomOptionShowHistory",
  default: false,
});

const isBottomOptionShowEditorAtom = atom<boolean>({
  key: "isBottomOptionShowEditor",
  default: false,
});

const isBottomOptionShowFileListAtom = atom<boolean>({
  key: "isBottomOptionFileListEditor",
  default: false,
});

export const useIsBottomOptionShowSource = getUseToggleOption(
  isBottomOptionShowSourceAtom
);

export const useIsBottomOptionShowHistory = getUseToggleOption(
  isBottomOptionShowHistoryAtom
);
export const useIsBottomOptionShowEditor = getUseToggleOption(
  isBottomOptionShowEditorAtom
);
export const useIsBottomOptionShowFilList = getUseToggleOption(
  isBottomOptionShowFileListAtom
);

export const useBottomOption = (): [boolean, () => void] => {
  const [isBottomOptionShow, setIsBottomOptionShow] = useRecoilState(
    isBottomOptionShowAtom
  );
  const toggleBottomOption = useRecoilCallback(
    ({ set }) =>
      async () => {
        setIsBottomOptionShow(!isBottomOptionShow);
        await set(isBottomOptionShowSourceAtom, false);
        await set(isBottomOptionShowHistoryAtom, false);
        await set(isBottomOptionShowFileListAtom, false);
      },
    [isBottomOptionShow, setIsBottomOptionShow]
  );
  return [isBottomOptionShow, toggleBottomOption];
};
