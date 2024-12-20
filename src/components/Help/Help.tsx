import "./Help.sass";

import { type FC } from "react";

import { Card, Text, Title } from "uikit";

interface HelpProps {
  to: string;
  title: string;
  text: string;
}

const Help: FC<HelpProps> = (props) => {
  const handleOnClick = () => {
    window.open(props.to, "_blank");
  };

  return (
    <Card className="Help" onClick={handleOnClick}>
      <Title weight="1">{props.title}</Title>
      <Text isDescription>{props.text}</Text>
    </Card>
  );
};

export default Help;
