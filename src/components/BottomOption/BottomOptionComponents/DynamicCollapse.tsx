import { Collapse } from "@chakra-ui/react";
import { ComponentType, useEffect, useState, VFC } from "react";
import { Fallback } from "../../Elements/Fallback";

interface Props {
  isOpen: boolean;
  Render: ComponentType;
}
export const DynamicCollapse: VFC<Props> = ({ isOpen, Render }) => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (isOpen) setInitialized(true);
  }, [isOpen]);
  return (
    <Collapse in={isOpen} animateOpacity>
      {initialized ? <Render /> : <Fallback />}
    </Collapse>
  );
};
