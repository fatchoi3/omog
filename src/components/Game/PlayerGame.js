import React, { useState, useEffect, memo } from "react";

import { Text } from "../../elements";
import Omog from "./Omog";
import TeachingB from "./TeachingB";
import TeachingW from "./TeachingW";
import Chatting from "./Chatting";
import Cloud from "../../pictures/cloud.png";
import styled, { keyframes } from "styled-components";

const PlayerGame = memo(
  ({
    socket,
    blackPlayer,
    whitePlayer,
    userInfo,
    gameNum,
    min,
    min2,
    sec,
    sec2,
    timeout,
    timeout2,
    timeOut,
    timeOut2,
  }) => {
    console.log("blackPlayer", blackPlayer);
    const [loading, setLoading] = useState(1);
    const is_player =
      userInfo.state === "blackPlayer" || userInfo.state === "whitePlayer"
        ? true
        : false;
    const isTeam =
      userInfo.state === "blackPlayer" || userInfo.state === "blackObserver"
        ? "black"
        : "white";
    const rand = (max, min) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const [randomNum, setRandomNum] = useState();
    const [flying, setFlying] = useState();
    useEffect(() => {
      socket.on("flyingWord", (data) => {
        setRandomNum(rand(1, 10) * 50);
        setFlying(data.chat.chat);

        setLoading(0);

        let timer = setTimeout(() => {
          console.log("시간은 똑딲똑딱");
          setLoading(1);
        }, 1000);
      });
    }, [socket]);

    return (
      <>
        {loading ? (
          ""
        ) : (
          <DialogBlock RandomNum={randomNum}>
            <Text is_size="50px" is_margin="20px 0 50px">
              {flying}
            </Text>
          </DialogBlock>
        )}
        <Wrap>
          <Omog
            userInfo={userInfo}
            gameNum={gameNum}
            socket={socket}
            blackPlayer={blackPlayer}
            whitePlayer={whitePlayer}
            min={min}
            min2={min2}
            sec={sec}
            sec2={sec2}
            timeout={timeout}
            timeout2={timeout2}
            timeOut={timeOut}
            timeOut2={timeOut2}
          />
          <TeachingWrap>
            <TeachingB
              playerInfo={blackPlayer}
              socket={socket}
              isTeam={isTeam}
            />
            <TeachingW
              playerInfo={whitePlayer}
              socket={socket}
              isTeam={isTeam}
            />
          </TeachingWrap>
        </Wrap>
        <ChattingWrap>
          <Chatting
            gameNum={gameNum}
            socket={socket}
            userInfo={userInfo}
            is_player={is_player}
            blackPlayer={blackPlayer}
            whitePlayer={whitePlayer}
          />
        </ChattingWrap>
      </>
    );
  }
);
const Wrap = styled.div`
  width: 950px;
  height: 923px;
  padding: 60px 10px 20px 10px;
`;
const TeachingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 950px;
  margin: 20px 0px 0px;
`;
const ChattingWrap = styled.div`
  width: 450px;
  margin: 0px 10px 0px 0px;
`;
const slideUp = keyframes`
from {
  transform: translateX(600px);
}
to {
  transform : translateX(0px);
}
`;

const DialogBlock = styled.div`
position: absolute;
top: ${(props) => props.RandomNum}px;
max-width: 600px;
height : 100px;
max-height: 400px;
margin : auto;
  background-image: url(${Cloud});
  background-size: contain;
  background-repeat: no-repeat;

  text-align: center;
  animation-duration: 1s;
  animation-timing-fuction: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  zIndex: 9999;
`;
export default PlayerGame;
