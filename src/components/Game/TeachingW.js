import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Heart from "../../pictures/Heart.png";
import { Text } from "../../elements";
import { actionCreators as gameActions } from "../../redux/modules/game";

const TeachingW = memo((props) => {
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.game.Teaching_listW);
  const scroll = useRef(null);

  const isTeam = props.isTeam;
  const socket = props.socket;

  const UserFaceColor = (point) => {
    let color = "black 2px";
    if (point >= 1300 && point < 1700) {
      color = "#835506 5px";
      return color;
    }
    if (point >= 1700 && point < 2500) {
      color = "#B2B2B2 5px";
      return color;
    }
    if (point >= 2500 && point < 4000) {
      color = "#FFF27E 5px";
      return color;
    }
    if (point >= 4000) {
      color = "#22E1E4 5px";
      return color;
    }
    return color;
  };

  const renderChat = () => {
    return (
      <div ref={scroll}>
        {chatList.map(({ id, message }, index) => (
          <ChatContents key={index}>
            <ChatId playerInfo={props.playerInfo}>
              <Userurl color={UserFaceColor(id)} />
              <Text is_size="12px" is_color="black" is_margin="2px 0 0 5px">
                {id}
              </Text>
            </ChatId>

            <ChatMessage playerInfo={props.playerInfo}>
              <Text is_size="15px" is_color="black ">
                {message}
              </Text>
            </ChatMessage>
          </ChatContents>
        ))}
      </div>
    );
  };
  const bottomView = useCallback(() => {
    scroll.current?.scrollIntoView({ block: "end" });
  }, []);

  useEffect(() => {
    bottomView();
  }, [bottomView, chatList]);

  useEffect(() => {
    dispatch(gameActions.AddTeachW(socket));
    console.log("chatList", chatList);
  }, [socket]);

  return (
    <Container playerInfo={props.playerInfo}>
      <Profile>
        {isTeam === "white" ? <HeartImg src={Heart} /> : ""}
        <DdongGraMe
          color={UserFaceColor(props.playerInfo?.point)}
          img={props.playerInfo?.profileImage}
        />
        <Text is_size="24px" is_bold>
          {" "}
          {props.playerInfo ? props.playerInfo.id : "2"}
        </Text>
      </Profile>
      <Chat_render_oneChat playerInfo={props.playerInfo}>
        {renderChat()}
      </Chat_render_oneChat>
    </Container>
  );
});
const Container = styled.div`
  width: 400px;
  height: 160px;
  display: flex;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
  border: 3px solid #94d7bb;
  border-radius: 10px;
`;
const Chat_render_oneChat = styled.div`
  width: 280px;
  border-radius: 15px;
  overflow-y: auto;
  margin: 10px 10px 10px 0px;
  height: 135px;
  border: 3px solid #94d7bb;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ChatContents = styled.div``;
const ChatId = styled.div`
  margin: 5px;
  border-radius: 5px;
  padding: 5px;
  width: 90px;
  display: flex;
`;
const ChatMessage = styled.div`
  margin: 5px 5px;
  max-width: 200px;
  padding: 5px;
  background-color: #94d7bb;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow-wrap: break-word;
  word-break: break-word;
`;
const Profile = styled.div`
  width: 120px;
  margin: 5px 0px 5px 5px;
  position: relative;
`;
const HeartImg = styled.img`
  position: absolute;
  width: 50px;
  height: 50ps;
  z-index: 999;
`;
const DdongGraMe = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  border: solid 2px black;
  margin: 15px 5px 15px 17px;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
`;
const Userurl = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 20px;
  border: solid ${(props) => props.color};
  background: #f0f0f0;
`;
export default TeachingW;
