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
    console.log("blackPlayer",blackPlayer);
    console.log("whitePlayer",whitePlayer);
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
            <Text is_size="2.93vw" is_margin="1.17vw 0 2.93vw">
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
            {/* <button onClick={()=>{ window.location.reload()}}>게임이 안될 때 눌러주세요!</button> */}
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
  width: 55.65vw;
  height: 41.01vw;
  padding: 3.51vw 0.59vw 1.17vw 0.59vw;
`;
const TeachingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55.65vw;
  margin: 1.17vw 0vw 0vw;
`;
const ChattingWrap = styled.div`
  width: 26.36vw;
  margin: 0vw 0.59vw 0vw 0vw;
`;
const slideUp = keyframes`
from {
  transform: translateX(35.15vw);
}
to {
  transform : translateX(0vw);
}
`;

const DialogBlock = styled.div`
position: absolute;
top: ${(props) => props.RandomNum}px;
max-width: 35.15vw;
height : 5.86vw;
max-height: 23.43vw;
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
  overflow-wrap: break-word;
  word-break: break-word;
`;
export default PlayerGame;
