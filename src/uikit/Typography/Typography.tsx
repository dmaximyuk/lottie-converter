import "./Typography.sass";

import { AllHTMLAttributes, ElementType, forwardRef } from "react";
import classNames from "classnames";

export interface TypographyProps extends AllHTMLAttributes<HTMLElement> {
  weight?: "1" | "2" | "3";
  caps?: boolean;
  Component?: ElementType;
  plain?: boolean;
}

export const Typography = forwardRef(
  (
    {
      Component = "p",
      weight = "3",
      plain = true,
      caps = false,
      className = "",
      ...restProps
    }: TypographyProps,
    ref,
  ) => (
    <Component
      ref={ref}
      className={classNames(
        "Typography",
        `Typography__wrapper--weight-${weight}`,
        {
          [`Typography__wrapper--plain`]: plain,
          [`Typography__wrapper--caps`]: caps,
        },
        className,
      )}
      {...restProps}
    />
  ),
);
