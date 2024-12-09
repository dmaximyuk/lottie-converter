import "./Text.sass";

import { forwardRef } from "react";
import classNames from "classnames";

import { Typography, TypographyProps } from "uikit";

export type TextProps = Omit<TypographyProps, "plain">;

export const Text = forwardRef(
  ({ weight, className = "", ...props }: TextProps, ref) => (
    <Typography
      ref={ref}
      {...props}
      weight={weight}
      className={classNames("Text", className)}
    />
  ),
);
