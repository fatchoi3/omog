import React, { useState, useEffect, memo, useCallback } from "react";

import { Text } from "../../elements";
import styled, { keyframes } from "styled-components";

import Omog from "./Omog";
import PlayerCardB from "./PlayerCardB";
import PlayerCardW from "./PlayerCardW";
import Chatting from "./Chatting";
import Cloud from "../../pictures/cloud.png";

const ObserverGame = memo(
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
            <Text
              is_size="2.93vw"
              is_margin="1.17vw 0 2.93vw"
              is_stroke="0.18vw black"
              is_color="white"
              is_bold
            >
              {flying}
            </Text>
          </DialogBlock>
        )}
        {loading ? (
          ""
        ) : (
          <DialogBlock RandomNum={randomNum}>
            <Text
              is_size="2.93vw"
              is_margin="1.17vw 0 2.93vw"
              is_stroke="0.18vw black"
              is_color="white"
              is_bold
            >
              {flying}
            </Text>
          </DialogBlock>
        )}
        <PlayerInfos>
          <PlayerCard>
            <PlayerCardB
              playerInfo={blackPlayer}
              min2={min2}
              sec2={sec2}
              isTeam={isTeam}
            />
          </PlayerCard>

          <PlayerCard>
            <PlayerCardW
              playerInfo={whitePlayer}
              min={min}
              sec={sec}
              isTeam={isTeam}
            />
          </PlayerCard>
        </PlayerInfos>
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
const PlayerCard= styled.div`
width : 12.89vw;
height : 41.01vw;
`
const PlayerInfos = styled.div`
width : 12.89vw;
  height: 39.84vw;
  display: flex;
  flex-direction: column;
  padding: 7.03vw 0vw;
  margin: 0 1.17vw;
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
  height: 5.86vw;
  max-height: 23.43vw;
  margin: auto;
 
  background-image: url(${Cloud});
  background-size: contain;
  background-repeat: no-repeat;
 
  text-align: center;
  animation-duration: 1s;
  animation-timing-fuction: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  zindex: 9999;
`;
export default ObserverGame;
