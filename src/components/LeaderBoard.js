import React from "react";
import styled, { keyframes } from "styled-components";
import { Text, Button } from "../elements";
import Home from "../pictures/Home.png";

const LeaderBoard = (props) => {
  const { open, close, header, enter, enterName } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    <>
      {open ? (
        <OpenModal>
          <Section>
            <Header>
              <DDiv></DDiv>
              <RoomTitle>
                <Text is_bold is_size="30px" is_margin="10% 0 0 4%">
                  {header}
                </Text>
              </RoomTitle>
              <Xbutton onClick={close}>✕</Xbutton>
            </Header>
            <Main>
              {props.children}
              {enter ? (
                <Button
                  is_width="15%"
                  is_height="20%"
                  is_margin="10px 35% 50px 41%"
                  is_background="#94d7bb"
                  is_radius="15px"
                  is_border="2px solid black"
                  is_hover="inset -8em 0 0 0 #f0f0f0, inset 8em 0 0 0 #f0f0f0"
                  _onClick={enter}
                >
                  <Text is_bold is_size="20px">
                    {enterName}
                  </Text>
                </Button>
              ) : (
                ""
              )}
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
  margin-top: -50px;
}
to {
  opacity: 1;
  margin-top: 0;
}
`;
const Section = styled.div`
  width: 50%;
  height: 70%;
  max-width: 1000px;
  max-height: 900px;
  margin: 0 auto;
  border: 2px solid black;
  border-radius: 1.4rem;
  background-color: #fff;

  animation: ${modal_show} 0.3s;
  overflow: hidden;
`;
const Header = styled.header`
  width: 100%;
  height: 15%;
  padding: 1% 0;
  background-color: #94d7bb;
  border-bottom: 2px solid black;
  font-weight: 700;
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  color: white;
`;
const Main = styled.main`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const RoomTitle = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
`;
const DDiv = styled.div`
  width: 40%;
`;
const Xbutton = styled.button`
  width: 5%;
  margin: 0 5%;
  font-size: 34px;
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

export default LeaderBoard;
