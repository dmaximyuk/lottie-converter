import "./Title.sass";

import { type ElementType, type FC } from "react";
import classNames from "classnames";

import { Typography, TypographyProps } from "uikit";

type TitleLevel = "1" | "2" | "3";

export interface TitleProps extends TypographyProps {
  level?: TitleLevel;
}

const titleLevelTags: Record<TitleLevel, ElementType> = {
  "1": "h2",
  "2": "h3",
  "3": "h4",
};

export const Title: FC<TitleProps> = ({
  level = "2",
  className = "",
  Component,
  ...props
}) => (
  <Typography
    {...props}
    className={classNames("Title", `Title__wrapper--${level}`, className)}
    Component={Component || titleLevelTags[level]}
  />
);
