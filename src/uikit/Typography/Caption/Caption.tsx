import "./Caption.sass";

import { FC } from "react";
import classNames from "classnames";

import { Typography, TypographyProps } from "uikit";

type CaptionLevel = "1" | "2";

export interface CaptionProps extends Omit<TypographyProps, "plain"> {
  level?: CaptionLevel;
}

export const Caption: FC<CaptionProps> = ({
  level = "1",
  className = "",
  Component = "span",
  ...props
}) => (
  <Typography
    {...props}
    className={classNames("Caption", `Caption__wrapper--${level}`, className)}
    Component={Component}
  />
);
