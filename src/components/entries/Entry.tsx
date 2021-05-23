import { ComponentType, VFC } from "react";

interface Props {
  Component: ComponentType;
}

export const Entry: VFC<Props> = ({ Component }) => (
  <div>
    <Component />
  </div>
);
