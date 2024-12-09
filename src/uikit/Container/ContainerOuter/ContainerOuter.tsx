import { createElement, type FC } from "react";
import cn from "classnames";

import type { ContainerOuterProps } from "./ContainerOuter.interface";

export const ContainerOuter: FC<ContainerOuterProps> = (props) => {
  return createElement(
    props.tagName || "section",
    {
      className: cn({
        Container__outer: true,
        [`${props.className}`]: !!props.className,
      }),
    },
    props.children,
  );
};
