import React from "react";
import styled from "styled-components";
import Home from "../pictures/Home.png";
import { Text,Button } from "../elements";
import "./RoomMake.css";

const RoomMake = (props) => {
  const { open, close, header, enter, enterName } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <Header>
              <RoomTitle>
            <HomeImg src={Home} />
            <Text
            is_bold
            is_size="30px"
            is_margin="8% 0 0 4%"
            >{header}</Text>
            </RoomTitle>
            <button className="close" onClick={close}>
                  ✕
            </button>
          </Header>
          <Main>{props.children}
                     {enter ? 
            <Button 
                is_width="20%"
                is_height="20%"
                is_margin="0 38% 50px 38%"
                is_background="#94d7bb"
                is_radius="15px"
                is_border="2px solid black"
                is_hover="inset -8em 0 0 0 #f0f0f0, inset 8em 0 0 0 #f0f0f0"
            _onClick={enter}
            >
                <Text
                is_bold
                is_size="20px"
                >{enterName}</Text>
                </Button> : ""}
                </Main>
        </section>
      ) : null}
    </div>
  );
};
const HomeImg = styled.img`
  width: 11%;
  height: 60%;
  margin: 3.5% 1% 1% 10%;
`;
const Header = styled.header`
width : 100%;
  height: 20%;
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
width : 100%;
height : 55%;
margin : 0 auto;
 
`;

const RoomTitle = styled.div`
height : 100%;
width : 50%;
display: flex;
`;
export default RoomMake;
