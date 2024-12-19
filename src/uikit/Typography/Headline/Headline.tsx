import "./Headline.sass";

import { type FC } from "react";
import cn from "clsx";

import { Typography, TypographyProps } from "uikit";

export type HeadlineProps = TypographyProps;

const Headline: FC<HeadlineProps> = ({
  className = "",
  Component = "h5",
  ...props
}) => (
  <Typography
    {...props}
    className={cn("Headline", className)}
    Component={Component}
  />
);

export default Headline;
