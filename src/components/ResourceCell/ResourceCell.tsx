import "./ResourceCell.sass";

import { type ReactNode, type FC } from "react";

import { Cell } from "uikit";

interface ResourceCellProps {
  title: string;
  icon: ReactNode;
  size: number;
}

const ResourceCell: FC<ResourceCellProps> = (props) => {
  return (
    <Cell
      icon={props.icon}
      title={props.title}
      text={`${(props.size / 1024).toFixed(3)} KB`}
    />
  );
};

export default ResourceCell;
