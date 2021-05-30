import { ReactNode, VFC } from "react";

interface Props {
  children: ReactNode;
}

export const Entry: VFC<Props> = ({ children }) => <div>{children}</div>;
