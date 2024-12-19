import "./Text.sass";

import { forwardRef } from "react";
import cn from "clsx";

import { Typography, TypographyProps } from "uikit";

export type TextProps = Omit<TypographyProps, "plain">;

const Text = forwardRef(
  ({ weight, className = "", ...props }: TextProps, ref) => (
    <Typography
      ref={ref}
      {...props}
      weight={weight}
      className={cn("Text", className)}
    />
  ),
);

export default Text;
