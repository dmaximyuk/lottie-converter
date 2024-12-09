import "./Home.sass";

import { type FC } from "react";
import { useTranslation } from "i18nano";

import {
  Caption,
  Container,
  Flex,
  Headline,
  LargeTitle,
  Subheadline,
  Text,
  Title,
} from "uikit";

import type { HomeProps } from "./Home.interface";

export const Home: FC<HomeProps> = () => {
  const t = useTranslation();

  return (
    <Container.Outer className="Home">
      <Container.Inner>
        <LargeTitle>LargeTitle</LargeTitle>
        <Title>Title</Title>
        <Headline>Headline</Headline>
        <Subheadline>Subheadline</Subheadline>
        <Caption>Caption</Caption>
        <Text>Text</Text>

        <Flex
          style={{ background: "orange", height: 100 }}
          horizontal={"center"}
          vertical={"center"}
          gap={25}
          padding={25}
        >
          <Text>Text</Text>
          <Text>Text</Text>
          <Text>Text</Text>
        </Flex>
      </Container.Inner>
    </Container.Outer>
  );
};
