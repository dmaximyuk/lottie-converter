import { type FC } from "react";
import cn from "classnames";

import type { ContainerInnerProps } from "./ContainerInner.interface";

export const ContainerInner: FC<ContainerInnerProps> = (props) => {
  return (
    <div
      className={cn({
        Container__inner: true,
        [`${props.className}`]: !!props.className,
      })}
    >
      {props.children}
    </div>
  );
};
