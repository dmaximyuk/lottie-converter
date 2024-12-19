import "./Caption.sass";

import { FC } from "react";
import cn from "clsx";

import { Typography, TypographyProps } from "uikit";

type CaptionLevel = "1" | "2";

export interface CaptionProps extends Omit<TypographyProps, "plain"> {
  level?: CaptionLevel;
}

const Caption: FC<CaptionProps> = ({
  level = "1",
  className = "",
  Component = "span",
  ...props
}) => (
  <Typography
    {...props}
    className={cn("Caption", `Caption__wrapper--${level}`, className)}
    Component={Component}
  />
);

export default Caption;
