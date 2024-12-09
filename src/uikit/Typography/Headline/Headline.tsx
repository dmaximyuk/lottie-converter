import "./Headline.sass";

import { type FC } from "react";
import classNames from "classnames";

import { Typography, TypographyProps } from "uikit";

export type HeadlineProps = TypographyProps;

export const Headline: FC<HeadlineProps> = ({
  className = "",
  Component = "h5",
  ...props
}) => (
  <Typography
    {...props}
    className={classNames("Headline", className)}
    Component={Component}
  />
);
