import React from "react";
import styled, { keyframes } from "styled-components";
import { Text } from "../../elements";

const GameEnd = (props) => {
  const { open, winner } = props;

  return (
    <>
      {open ? (
        <OpenModal>
          <Section>
            <Main>
              <Text is_size="100px" is_color="white" is_margin="100px 0 0 0">
                {winner}
              </Text>
              <Text is_color="white" is_margin="100px 0 0 0">
                {" "}
                잠시 후 결과페이지로 넘어갑니다{" "}
              </Text>
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
  width: 400px;
  height: 250px;
  max-width: 58.58vw;
  max-height: 52.72vw;
  border: 0.12vw solid black;
  border-radius: 1.4rem;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 20px 0 0 400px;
  animation: ${modal_show} 0.3s;
  overflow: hidden;
`;
const Main = styled.main`
  width: 400px;
  height: 250px;
  margin: 0 auto;
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
  animation: ${modal_bg_show} 0.3s;
`;

export default GameEnd;
