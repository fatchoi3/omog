import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Text } from "../elements";
import { actionCreators as gameActions } from "../redux/modules/game";

const TeachingW = memo((props) => {
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.game.Teaching_listW);
  const scroll = useRef(null);

  const socket = props.socket;

  const renderChat = () => {
    return (
      <div ref={scroll}>
        {chatList.map(({ id, message }, index) => (
          <ChatContents key={index}>
            <ChatId playerInfo={props.playerInfo}>
              <Text is_size="12px" is_color="black">
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
        <DdongGraMe />
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
  overflow-y: auto;
  margin: 10px 5px 10px 0px;
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
  width: 50px;
`;
const ChatMessage = styled.div`
  margin: 5px 5px;

  padding: 5px;
  background-color: #94d7bb;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;
const Profile = styled.div`
  width: 120px;
  margin: 5px 0px 5px 5px;
`;
const DdongGraMe = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  border: solid 2px black;
  margin: 15px 5px 15px 17px;
`;
export default TeachingW;
