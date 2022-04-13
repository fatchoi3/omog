import React from "react";
import styled, { keyframes } from "styled-components";

const UserModal = (props) => {
  const { open, close } = props;

  return (
    <>
      {open ? (
        <OpenModal>
          <Section>
            <Header>
              <DDiv></DDiv>

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
  margin-top: -50px;
}
to {
  opacity: 1;
  margin-top: 0;
}
`;
const Section = styled.div`
  width: 30%;
  height: 40%;

  max-height: 900px;
  margin: 0 0 400px 1000px;
  border: 2px solid black;
  border-radius: 1.4rem;
  background-color: #fff;

  animation: ${modal_show} 0.3s;
  overflow: hidden;
`;
const Header = styled.header`
  width: 100%;
  height: 10%;
  padding: 1% 0;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  color: white;
`;
const Main = styled.main`
  width: 100%;
  height: 100%;
  margin: 0 auto;
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
  color: black;
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

export default UserModal;
