import "./Event.sass";

import {
  type AllHTMLAttributes,
  type FC,
  type MouseEvent,
  useState,
} from "react";
import cn from "clsx";

interface EventProps extends Omit<AllHTMLAttributes<HTMLElement>, "type"> {
  Component: "button" | "div";
  disabled?: boolean;
}

const Event: FC<EventProps> = ({
  className,
  disabled,
  Component = "div",
  onClick,
  ...props
}) => {
  const delay = 200;
  const [mouseEnter, setMouseEnter] = useState(false);
  const [mouseClicked, setMouseClicked] = useState(false);

  const handleOnClick = (e: MouseEvent) => {
    if (!onClick) return;

    setMouseClicked(true);

    setTimeout(() => {
      setMouseClicked((s) => {
        onClick && onClick(e as any);
        s = false;
        return s;
      });
    }, delay);
  };

  return (
    <Component
      {...props}
      disabled={disabled}
      onClick={handleOnClick}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={cn(
        "Event",
        !!onClick && "Event_clickable",
        mouseEnter && !!onClick && "Event--hover",
        mouseClicked && !!onClick && "Event--clicked",
        disabled && "Event_disabled",
        className,
      )}
    />
  );
};

export default Event;
