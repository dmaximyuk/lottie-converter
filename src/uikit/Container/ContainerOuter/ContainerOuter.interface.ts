import type { HTMLAttributes } from "react";

export interface ContainerOuterProps
  extends Omit<HTMLAttributes<HTMLElement>, ""> {
  tagName?: "header" | "footer" | "div";
}
