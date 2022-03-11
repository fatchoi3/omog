import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import Omog from "../components/Omog";
import Chatting from "../components/Chatting";
import Teaching from "../components/Teaching";
import { Text } from "../elements";

import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as gameActions } from "../redux/modules/game";

const Game = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const gameInfo = useSelector((state) => state.game.gameInfo);
  const userId = localStorage.getItem("userId");
  const gameNum = props.match.params.roomNum;
 
  console.log("gameInfo",gameInfo)
  const [whitePlayer,setWhitePlayer] = useState({
    id: "초기값1",
    score: [2, 3],
    point: 1000,
    state: "whitePlayer",
  });
  const [blackPlayer,setBlackPlayer] = useState({
    id: "초기값2",
    score: [3, 2],
    point: 1000,
    state: "blackPlayer",
  });
  const winnerW=gameInfo.whiteTeamPlayer;
  const winnerB=gameInfo.blackTeamPlayer;
 

  const socketRef = useRef();
  const [loading, setLoading] = useState(1);
  const [loadingFade, setLoadingFade] = useState(1);
  const [flying, setFlying] = useState();
  const [fade, setFade]= useState();
  // const gameNum = 3;
 const rand = (max, min)=>{
   return Math.floor(Math.random() * (max - min)) + min;
 };
 
 let randomNum;

  useEffect(() => {
    if(userInfo.state=== "whitePlayer"){
      setWhitePlayer(userInfo);
    }else if(userInfo.state === "blackPlayer"){
      setBlackPlayer(userInfo);
    };
  
    dispatch(userActions.loginCheckDB(userId));
    dispatch(gameActions.getGameDB(gameNum)); 
    console.log("Fly훈수는 언제나옴?");
    socketRef.current = io.connect("http://15.164.103.116/game");
    // socketRef.current = io.connect("http://localhost:4001");

    socketRef.current.emit("joinGame", gameNum);
    socketRef.current.emit("nickname", userId);
    randomNum = rand(1,10);
    console.log("randomNum",randomNum)
   
    socketRef.current.on("fadeOut", (data) => {
      setFade(data.chat.chat);
      setLoadingFade(0);
      console.log("되네");
      let timer = setTimeout(() => {
        console.log("시간은 똑딲똑딱");
        setLoadingFade(1);
      }, 1000);
    });

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
        <DialogBlock RandomNum={randomNum}>
          <Text
          is_size="50px"
          >{flying}</Text>
        </DialogBlock>
      )}
      {loadingFade ? (
        ""
      ) : (
        <DarkBackground RandomNum={randomNum}>
          <Text
          is_size="50px"
          >{fade}</Text>
        </DarkBackground>
      )}
      <Wrap>
        <Omog userInfo={userInfo} gameNum={gameNum} winnerW={winnerW} winnerB={winnerB}/>
        <UnderInfo>
          {/* {userInfo.state == "playerW" || userInfo.state =="playerB" ? ( */}
          <TeachingWrap>
            <Teaching playerInfo={whitePlayer} />
            <Teaching playerInfo={blackPlayer} />
          </TeachingWrap>
             </UnderInfo>
      </Wrap>
      <Chatting gameNum={gameNum} />
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
top: ${(props=>props.randomNum*50)} px;
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
const fadeIn = keyframes`
from{
  opacity: 0
}
to{
  opacity: 1
}
`;
const DarkBackground = styled.div`
position: fixed;
left : 100px:
top : 100px;
width : 400px;
height: 200px;
display: flex;
align-items: center;
background : rgba(0, 0, 0, 0.8);

animation-duration : 1s;
animation-timing-function: ease-out;
animation-name: ${fadeIn};
animation-fill-mode: forwards;
`;

export default Game;
