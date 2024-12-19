import "./Subheadline.sass";

import { forwardRef } from "react";

import cn from "clsx";

import { Typography, TypographyProps } from "uikit";

type SubheadlineLevel = "1" | "2";

export interface SubheadlineProps extends Omit<TypographyProps, "level"> {
  level?: SubheadlineLevel;
}

const Subheadline = forwardRef(
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
      className={cn("Subheadline", `Subheadline__wrapper--${level}`, className)}
      Component={Component}
    />
  ),
);

export default Subheadline;
