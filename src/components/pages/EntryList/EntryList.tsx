import { ReactNode, VFC } from "react";

interface Props {
  children: ReactNode;
}

export const EntryList: VFC<Props> = ({ children }) => <div>{children}</div>;
