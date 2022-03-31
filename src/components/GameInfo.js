import React from "react";
import styled, { keyframes } from "styled-components";
import { Text, Button } from "../elements";
import GameSlider from "./GameSlider"

const GameInfo = (props) => {
  const { open, close, header, enter, enterName } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    <>
      {open ? (
        <OpenModal>
          <Section>
            <Header>
              <DDiv></DDiv>
              <Text is_size="2.64vw" is_margin="0.7vw 0 0 0" is_bold >게임 방법 설명!</Text>
              <Xbutton onClick={close}>✕</Xbutton>
            </Header>
            <Main>
            <GameSlider/>
                </Main>
          </Section>
        </OpenModal>
      ) : null}
    </>
  );
};
const modal_bg_show = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}

`;
const modal_show = keyframes`
from {
  opacity: 0;
  margin-top: -2.93vw;
}
to {
  opacity: 1;
  margin-top: 0;
}
`;
const Section = styled.div`
  width: 49.79vw;
  height: 38.08vw;
  max-width: 58.58vw;
  max-height: 52.72vw;
  margin: 0 auto;
  border: 0.12vw solid black;
  border-radius: 1.4rem;
  background-color: #fff;

  animation: ${modal_show} 0.3s;
  overflow: hidden;
`;
const Header = styled.header`
  width: 49.79vw;
  height: 2.93vw;
  padding: 0.47vw 0;
  background-color: #94d7bb;
  border-bottom: 0.12vw solid black;
  font-weight: 700;
  font-size: 1.46vw;
  display: flex;
  justify-content: space-between;
  color: white;
`;
const Main = styled.main`
  width: 49.79vw;
  height: 29.29vw;
  margin: 0 auto;
`;

const DDiv = styled.div`
  width: 7.03vw;
`;
const Xbutton = styled.button`
  width: 2.34vw;
  margin: 0 5%;
  font-size: 1.99vw;
  font-weight: 700;
  text-align: center;
  color: white;
  border: none;
  background-color: transparent;
`;

const OpenModal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  animation: ${modal_bg_show} 0.3s;
`;

export default GameInfo;
