import { IconChevron } from "assets/icons";
import "./Cell.sass";

import type { FC, ReactNode } from "react";

import { Caption, Card, Text } from "uikit";

interface CellProps {
  title: string;
  text: string;
  icon: ReactNode;
  onClick?: () => void;
}

const Cell: FC<CellProps> = (props) => {
  return (
    <Card className="Cell" onClick={props.onClick}>
      <div className="Cell__icon">{props.icon}</div>
      <div className="Cell__typography">
        <div className="Cell__title">
          <Caption isDescription>{props.title}</Caption>
          {!!props.onClick && (
            <IconChevron className="Cell__chevron" width={14} />
          )}
        </div>
        <Text>{props.text}</Text>
      </div>
    </Card>
  );
};

export default Cell;
