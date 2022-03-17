import React, { useState, useRef, useEffect, memo } from "react";
import styled, { keyframes } from "styled-components";

import Omog from "../components/Omog";
import Chatting from "../components/Chatting";
import TeachingW from "../components/TeachingW";
import TeachingB from "../components/TeachingB";
import PlayerCardB from "../components/PlayerCardB";
import PlayerCardW from "../components/PlayerCardW";
import { Text } from "../elements";
import Logo from "../pictures/omogLogo.png";
import useSocket from "../hook/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as gameActions } from "../redux/modules/game";
const Game = memo((props) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const gameInfo = useSelector((state) => state.game.gameInfo);
  const blackPlayer = useSelector((state) => state.user.blackPlayerInfo);
  const whitePlayer = useSelector((state) => state.user.whitePlayerInfo);
  const userId = localStorage.getItem("userId");
  const gameNum = props.match.params.roomNum;
  const is_player =
    userInfo.state === "blackPlayer" || 
    userInfo.state === "whitePlayer"
      ? true
      : false;
 

  
  const winnerW = gameInfo.whiteTeamPlayer;
  const winnerB = gameInfo.blackTeamPlayer;

  const [loading, setLoading] = useState(1);
  const [loadingFade, setLoadingFade] = useState(1);
  const [flying, setFlying] = useState();
  const [fade, setFade] = useState();

  const rand = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  console.log("userInfo", userInfo);
  //"http://15.164.103.116/game",
  let randomNum;
  const [socket, disconnectSocket] = useSocket(
    "http://localhost:4001/game",
    gameNum,
    userId
  );
  useEffect(() => {

    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);
  useEffect(() => {
  
    dispatch(userActions.loginCheckDB(userId));
    dispatch(gameActions.getGameDB(gameNum));
        console.log("Fly훈수 받기");

    socket.on("flyingWord", (data) => {
      randomNum = rand(1, 10);
      setFlying(data.chat.chat);
      setLoading(0);
      console.log("되네");
      console.log("data",data);
      let timer = setTimeout(() => {
        console.log("시간은 똑딲똑딱");
        setLoading(1);
      }, 1000);
    });
  }, []);
  useEffect(()=>{
    if(blackPlayer){
    dispatch(userActions.blackPlayerCheck(gameInfo.blackTeamPlayer));
    dispatch(userActions.whitePlayerCheck(gameInfo.whiteTeamPlayer));
  }
  },[blackPlayer])
  console.log("blackPlayer",blackPlayer);
  console.log("whitePlayer", whitePlayer);
  return (
    <GameContainer>
      {loading ? (
        ""
      ) : (
        <DialogBlock RandomNum={randomNum}>
          <Text is_size="50px">{flying}</Text>
        </DialogBlock>
      )}
      {loadingFade ? (
        ""
      ) : (
        <DarkBackground RandomNum={randomNum}>
          <Text is_size="50px">{fade}</Text>
        </DarkBackground>
      )}
      <LogoWrap>
        <LogoImg src={Logo} />
      </LogoWrap>
      {is_player?
      <>
      <Wrap>
        <Omog
          userInfo={userInfo}
          gameNum={gameNum}
          winnerW={winnerW}
          winnerB={winnerB}
          socket={socket}
          
        />
        <TeachingWrap>
          <TeachingW playerInfo={whitePlayer} socket={socket} />
          <TeachingB playerInfo={blackPlayer} socket={socket} />
        </TeachingWrap>
      </Wrap>
      <ChattingWrap>
        <Chatting gameNum={gameNum} socket={socket} userInfo={userInfo} />
      </ChattingWrap>
      </>
      :<>
      <PlayerInfos>
        <>
        <PlayerCardW playerInfo={whitePlayer} />
      </>
      <>
         <PlayerCardB playerInfo={blackPlayer}/>
      </>
      </PlayerInfos>
      <Omog
          userInfo={userInfo}
          gameNum={gameNum}
          winnerW={winnerW}
          winnerB={winnerB}
          socket={socket}
          
        />
         <ChattingWrap>
        <Chatting gameNum={gameNum} socket={socket} userInfo={userInfo} />
      </ChattingWrap>
      </>
      }
    </GameContainer>
  );
});
const GameContainer = styled.div`
  display: flex;
  width: 1456px;
  margin: 0 auto;
  padding: 50px auto;
  height: 924px;
  // background-color: pink;
  justify-content: space-between;
`;
const Wrap = styled.div`
  width: 950px;
  padding: 30px 10px 20px 10px;
`;
const TeachingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 950px;
  margin: 20px 0px 0px;
`;

const PlayerInfos = styled.div`
height: 680px;
display : flex; 
flex-direction: column;
padding: 120px 0px;
margin : 0 20px;

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
top: ${(props) => props.randomNum * 50} px;
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
const LogoWrap = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;
const LogoImg = styled.img`
  width: 200px;
  height: 100px;
`;
export default Game;
