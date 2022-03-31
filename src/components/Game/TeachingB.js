import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Heart from "../../pictures/Heart.png";
import { Text } from "../../elements";
import { actionCreators as gameActions } from "../../redux/modules/game";

const TeachingB = memo((props) => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.game.Teaching_listB);
  const scroll = useRef(null);
  const isTeam = props.isTeam;
  const socket = props.socket;

  const UserFaceColor = (point) => {
    let color = "black 0.12vw";
    if (point >= 1300 && point < 1700) {
      color = "#835506 0.29vw";
      return color;
    }
    if (point >= 1700 && point < 2500) {
      color = "#B2B2B2 0.29vw";
      return color;
    }
    if (point >= 2500 && point < 4000) {
      color = "#FFF27E 0.29vw";
      return color;
    }
    if (point >= 4000) {
      color = "#22E1E4 0.29vw";
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
              <Text is_size="0.76vw" is_color="black" is_margin="0.12vw 0 0 0.29vw">
                {id}
              </Text>
            </ChatId>

            <ChatMessage playerInfo={props.playerInfo}>
              <Text is_size="0.88vw" is_color="black ">
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
    dispatch(gameActions.AddTeachB(socket));
    console.log("chatList", chatList);
  }, [socket]);

  return (
    <Container playerInfo={props.playerInfo}>
      <Profile>
        {isTeam === "black" ? <HeartImg src={Heart} /> : ""}
        <DdongGraMe
          color={UserFaceColor(props.playerInfo?.point)}
          img={props.playerInfo?.profileImage}
        />
        <Text is_size="1.41vw" is_bold>
          {" "}
          {props.playerInfo ? props.playerInfo.id : "1"}
        </Text>
      </Profile>
      <Chat_render_oneChat playerInfo={props.playerInfo}>
        {renderChat()}
      </Chat_render_oneChat>
    </Container>
  );
});
const Container = styled.div`
  width: 23.43vw;
  height: 9.37vw;
  display: flex;
  box-shadow: 0vw 0.18vw 1.41vw -0.47vw rgba(0, 0, 0, 0.75);
  border: 0.18vw solid
    ${(props) =>
      props.playerInfo?.state === "whitePlayer" ? `#94d7bb` : `#9E9E9E`};
  border-radius: 0.59vw;
`;
const Chat_render_oneChat = styled.div`
  width: 16.4vw;
  border-radius: 0.88vw;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0.59vw 0.59vw 0.59vw 0vw;
  height: 7.91vw;
  box-shadow: 0vw 0.18vw 1.41vw -0.47vw rgba(0, 0, 0, 0.75);
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ChatContents = styled.div``;
const ChatId = styled.div`
  margin: 0.29vw;
  border-radius: 0.29vw;
  padding: 0.29vw;
  width: 5.27vw;
  display: flex;
`;
const ChatMessage = styled.div`
  margin: 0.29vw 0.29vw;
  max-width: 11.72vw;
  padding: 0.29vw;
  border: 0.06vw solid black;
  background-color: #f0f0f0;
  border-top-right-radius: 0.29vw;
  border-bottom-left-radius: 0.29vw;
  border-bottom-right-radius: 0.29vw;
  overflow-wrap: break-word;
  word-break: break-word;
`;
const Profile = styled.div`
  width: 7.03vw;
  margin: 0.29vw 0vw 0.29vw 0.29vw;
  position: relative;
`;
const HeartImg = styled.img`
  position: absolute;
  width: 2.93vw;
  height: 50ps;
  z-index: 999;
`;
const DdongGraMe = styled.div`
  width: 4.1vw;
  height: 4.1vw;
  border-radius: 4.1vw;
  border: solid ${(props) => props.color};
  margin: 0.88vw 0.29vw 0.88vw 1vw;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
`;
const Userurl = styled.div`
  height: 1.17vw;
  width: 1.17vw;
  border-radius: 1.17vw;
  border: solid ${(props) => props.color};
  background: #f0f0f0;
`;
export default TeachingB;
