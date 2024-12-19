import "./Card.sass";

import { AllHTMLAttributes, type FC } from "react";
import cn from "clsx";

import { Event } from "uikit";

interface CardProps extends AllHTMLAttributes<HTMLDivElement> {}

const Card: FC<CardProps> = ({ className, ...props }) => {
  return <Event {...props} Component="div" className={cn("Card", className)} />;
};

export default Card;
