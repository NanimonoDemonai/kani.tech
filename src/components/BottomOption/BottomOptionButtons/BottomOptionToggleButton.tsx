import { VFC } from "react";
import { Link } from "@chakra-ui/react";

interface Props {
  onToggle: () => void;
  isOpen: boolean;
  label: string;
}

export const BottomOptionToggleButton: VFC<Props> = ({
  onToggle,
  isOpen,
  label,
}) => (
  <Link onClick={onToggle} fontSize="sm">
    {isOpen ? "-" : "+"} {label}
  </Link>
);
