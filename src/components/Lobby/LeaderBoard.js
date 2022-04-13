import React from "react";
import styled, { keyframes } from "styled-components";
import { Text } from "../../elements";

const LeaderBoard = (props) => {
  const { open, close, header } = props;

  return (
    <>
      {open ? (
        <OpenModal>
          <Section>
            <Header>
              <DDiv></DDiv>
              <RoomTitle>
                <Text is_bold is_size="1.76vw" is_margin="2.34vw 0 0 1.17vw">
                  {header}
                </Text>
              </RoomTitle>
              <Xbutton onClick={close}>✕</Xbutton>
            </Header>
            <Main>{props.children}</Main>
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
  height: 5.86vw;
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

const RoomTitle = styled.div`
  height: 2.93vw;
  width: 24.9vw;
  display: flex;
`;
const DDiv = styled.div`
  width: 20.5vw;
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

export default LeaderBoard;
