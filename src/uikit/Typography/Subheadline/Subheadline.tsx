import "./Subheadline.sass";

import { forwardRef } from "react";

import classNames from "classnames";

import { Typography, TypographyProps } from "uikit";

type SubheadlineLevel = "1" | "2";

export interface SubheadlineProps extends Omit<TypographyProps, "level"> {
  level?: SubheadlineLevel;
}

export const Subheadline = forwardRef(
  (
    {
      level = "1",
      className = "",
      Component = "h6",
      ...restProps
    }: SubheadlineProps,
    ref,
  ) => (
    <Typography
      {...restProps}
      ref={ref}
      className={classNames(
        "Subheadline",
        `Subheadline__wrapper--${level}`,
        className,
      )}
      Component={Component}
    />
  ),
);
