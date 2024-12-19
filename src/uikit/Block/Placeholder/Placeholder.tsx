import "./Placeholder.sass";

import { type FC, type ReactNode } from "react";
import cn from "clsx";

import { Text, Title } from "uikit";

interface PlaceholderProps {
  title: string;
  subtitle: string;
  icon: ReactNode;

  disabled?: boolean;
}

const Placeholder: FC<PlaceholderProps> = (props) => {
  return (
    <div
      className={cn("Placeholder", props.disabled && "Placeholder_disabled")}
    >
      <div className="Placeholder__icon">{props.icon}</div>
      <div className="Placeholder__typography">
        <Title weight="1">{props.title}</Title>
        <Text>{props.subtitle}</Text>
      </div>
    </div>
  );
};

export default Placeholder;
