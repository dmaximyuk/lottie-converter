import "./Help.sass";

import { useCallback, type FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "utils";

import { Card, Text, Title } from "uikit";

import { RouteID } from "models";

interface HelpProps {
  to: RouteID;
  title: string;
  text: string;
}

const Help: FC<HelpProps> = (props) => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      console.log("Card clicked");
      navigate(getRoutePath(props.to));
    },
    [props.to],
  );

  return (
    <Card className="Help" onClick={handleOnClick}>
      <Title weight="1">{props.title}</Title>
      <Text isDescription>{props.text}</Text>
    </Card>
  );
};

export default Help;
