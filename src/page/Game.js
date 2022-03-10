import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import Omog from "../components/Omog";
import Chatting from "../components/Chatting";
import Teaching from "../components/Teaching";
import PlayerCard from "../components/PlayerCard";
import FlyingWord from "../components/FlyingWord";
import { Text } from "../elements";

import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Game = () => {
  const dispatch = useDispatch();
  const get_user = useSelector((state) => state.user.userInfo);
  const userId = localStorage.getItem("userId");

  console.log("get_user", get_user);
  const userInfo = {
    id: "jong0325",
    score: (2, 3),
    point: 1000,
    // state: "playerW",
    state: "playerB",
    // state: "observerW",
    // state: "observerB",
  };
  const playerlist = [
    {
      id: "jong0325",
      score: [2, 3],
      point: 1000,
      state: "playerW",
    },
    {
      id: "sssssseok",
      score: [3, 2],
      point: 1000,
      state: "playerB",
    },
  ];
  const socketRef = useRef();
  const [loading, setLoading] = useState(1);
  const [flying, setFlying] = useState();
  const gameNum = 3;

  useEffect(() => {
    dispatch(userActions.loginCheckDB(userId));
    console.log("Fly훈수는 언제나옴?");
    socketRef.current = io.connect("http://15.164.103.116/game");
    // socketRef.current = io.connect("http://localhost:4001");

    socketRef.current.emit("joinGame", gameNum);
    socketRef.current.emit("nickname", userId);

    socketRef.current.on("flyingWord", (data) => {
      setFlying(data.chat.chat);
      setLoading(0);
      console.log("되네");
      let timer = setTimeout(() => {
        console.log("시간은 똑딲똑딱");
        setLoading(1);
      }, 1000);
    });
    return () => socketRef.current.disconnect();
  }, []);

  return (
    <GameContainer>
      {loading ? (
        ""
      ) : (
        <DialogBlock>
          <Text
          is_size="50px"
          >{flying}</Text>
        </DialogBlock>
      )}
      <Wrap>
        <Omog userInfo={userInfo} />
        <UnderInfo>
          {/* {userInfo.state == "playerW" || userInfo.state =="playerB" ? ( */}
          <TeachingWrap>
            <Teaching playerInfo={playerlist[0]} />
            <Teaching playerInfo={playerlist[1]} />
          </TeachingWrap>
          {/* ) : ( */}
          {/* <PlayerCardWrap>
              <PlayerCard playerInfo={playerlist[0]} />
              <PlayerCard playerInfo={playerlist[1]} />
            </PlayerCardWrap>
          )} */}
        </UnderInfo>
      </Wrap>
      <Chatting />
    </GameContainer>
  );
};
const GameContainer = styled.div`
  display: flex;
  width: 1000px;
  margin: 0 auto;
`;
const Wrap = styled.div``;
const TeachingWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UnderInfo = styled.div``;

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
top: 200px;
width: 400px;
height: 200px;
line-height: 200px;
  border-radius: 20px;
  background-color: pink;
  border: 2px solid black 
  text-align: center;
  animation-duration: 1s;
  animation-timing-fuction: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  zIndex: 9999;
`;
const Block = styled.div`
background-color: pink;
`;
export default Game;
