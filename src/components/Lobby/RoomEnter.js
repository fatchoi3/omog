import React from "react";
import styled from "styled-components";
import { Text, Button } from "../../elements";
import Home from "../../pictures/Home.png";
import "./RoomEnter.css";

const RoomEnter = (props) => {
  const { open, close, header, enter, enterName } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <Header>
            <DDiv></DDiv>
            <RoomTitle>
              <HomeImg src={Home} />
              <Text is_bold is_size="1.76vw" is_margin="8% 0 0 4%">
                {header}
              </Text>
            </RoomTitle>
            <button className="close" onClick={close}>
              ✕
            </button>
          </Header>
          <Main>
            {props.children}
            {enter ? (
              <Button
                is_width="26.36vw"
                is_height="2.93vw"
                is_margin="0.59vw 2.34vw 2.93vw 11.72vw"
                is_background="#94d7bb"
                is_radius="0.88vw"
                is_border="0.12vw solid black"
                is_hover="inset -8em 0 0 0 #f0f0f0, inset 8em 0 0 0 #f0f0f0"
                _onClick={enter}
              >
                <Text is_bold is_size="1.17vw">
                  {enterName}
                </Text>
              </Button>
            ) : (
              ""
            )}
          </Main>
        </section>
      ) : null}
    </div>
  );
};
const HomeImg = styled.img`
  width: 2.93vw;
  height: 2.93vw;
  margin: 0.88vw 0.29vw 0.88vw 1.76vw;
`;
const Header = styled.header`
  width: 49.79vw;
  height: 4.69vw;
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
  height: 23.43vw;
  margin: 0 auto;
`;

const RoomTitle = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
`;
const DDiv = styled.div`
  width: 25%;
`;
export default RoomEnter;
