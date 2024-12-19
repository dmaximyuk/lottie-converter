import "./LargeTitle.sass";

import { type FC } from "react";
import cn from "clsx";

import { Typography, TypographyProps } from "uikit";

export type LargeTitleProps = TypographyProps;

const LargeTitle: FC<LargeTitleProps> = ({
  className = "",
  Component = "h1",
  ...props
}) => (
  <Typography
    {...props}
    Component={Component}
    className={cn("LargeTitle", className)}
  />
);

export default LargeTitle;
