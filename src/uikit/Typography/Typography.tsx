import "./Typography.sass";

import { AllHTMLAttributes, ElementType, forwardRef } from "react";
import cn from "clsx";

export interface TypographyProps extends AllHTMLAttributes<HTMLElement> {
  Component?: ElementType;

  weight?: "1" | "2" | "3";
  caps?: boolean;
  plain?: boolean;

  isDescription?: boolean;
}

const Typography = forwardRef(
  (
    {
      Component = "p",
      weight = "3",
      plain = true,
      caps = false,
      className = "",
      isDescription = false,
      ...restProps
    }: TypographyProps,
    ref,
  ) => (
    <Component
      ref={ref}
      className={cn(
        "Typography",
        `Typography__wrapper--weight-${weight}`,
        plain && "Typography__wrapper--plain",
        caps && "Typography__wrapper--caps",
        isDescription && "Typography_opacity",
        className,
      )}
      {...restProps}
    />
  ),
);

export default Typography;
