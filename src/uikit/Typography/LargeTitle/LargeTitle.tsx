import "./LargeTitle.sass";

import { type FC } from "react";
import classNames from "classnames";

import { Typography, TypographyProps } from "uikit";

export type LargeTitleProps = TypographyProps;

export const LargeTitle: FC<LargeTitleProps> = ({
  className = "",
  Component = "h1",
  ...props
}) => (
  <Typography
    {...props}
    Component={Component}
    className={classNames("LargeTitle", className)}
  />
);
