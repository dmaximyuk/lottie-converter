import "./Dropdown.sass";

import { FC, useState } from "react";
import cn from "clsx";

import { Caption } from "uikit";

import { IconChevron } from "assets/icons";

interface DropdownProps {
  title: string;
  items: {
    id: string | number;
    value: string | number;
    children: string | number;
  }[];
}

const Dropdown: FC<DropdownProps> = (props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="Dropdown" onClick={() => setOpen((s) => !s)}>
      <Caption>{props.title}</Caption>
      <IconChevron
        className={cn("Dropdown__chevron", isOpen && "Dropdown__chevron--open")}
        width={14}
        height={14}
        color="var(--text-primary)"
      />
    </div>
  );
};

export default Dropdown;
