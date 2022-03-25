import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import styled, { keyframes } from "styled-components";

import Omog from "../components/Omog";
import Chatting from "../components/Chatting";
import TeachingW from "../components/TeachingW";
import TeachingB from "../components/TeachingB";
import PlayerCardB from "../components/PlayerCardB";
import PlayerCardW from "../components/PlayerCardW";
import Spinner from "../elements/Spinner";

import { Text } from "../elements";
import Logo from "../pictures/omogLogo.png";
import useSocket from "../hook/useSocket";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as gameActions } from "../redux/modules/game";

const Game = memo((props) => {
  const dispatch = useDispatch();
  const [spin, setsping] = useState(true);
  const userInfo = useSelector((state) => state.user.userInfo);
  const gameInfo = useSelector((state) => state.game.gameInfo);

  const userId = localStorage.getItem("userId");
  const gameNum = props.match.params.roomNum;
  const is_player =
    userInfo.state === "blackPlayer" || userInfo.state === "whitePlayer"
      ? true
      : false;

  console.log("가져오기gameInfo", gameInfo);
  // const pickGameInfo = useCallback((gameInfo) => {
  //   for (let i = 0; i < gameInfo?.length; i++) {
  //     if (gameInfo[i]?.blackTeamPlayer[0]) {
  //       return gameInfo[i];
  //     }
  //   }
  // }, []);

  const realGameInfo = gameInfo[0];
  // gameInfo[0]?.blackTeamPlayer.length === 0 ? gameInfo[1] : gameInfo[0];
  console.log("realGameInfo", realGameInfo);
  const blackPlayer = realGameInfo?.blackTeamPlayer[0];
  const whitePlayer = realGameInfo?.whiteTeamPlayer[0];
  console.log("blackTeamPlayer", blackPlayer);
  console.log("whiteTeamPlayer", whitePlayer);
  const [randomNum, setRandomNum] = useState();

  const [loading, setLoading] = useState(1);
  const [flying, setFlying] = useState();

  const rand = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  //////수정사항
  //http://15.165.158.25/game
  //"http://localhost:4001/game",
  const [socket, disconnectSocket] = useSocket(
    "http://15.165.158.25/game",
    gameNum,
    userId
  );

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);

  useEffect(() => {
    dispatch(gameActions.getGameDB(gameNum));
    dispatch(userActions.loginCheckDB(userId));
    let timer = setTimeout(() => {
      setsping(false)
    }, 1000)

  }, []);

  ///

  // useEffect(() => {
  //   dispatch(userActions.loginCheckDB(userId));
  //   dispatch(gameActions.getGameDB(gameNum));
  // }, []);

  useEffect(() => {
    socket.on("flyingWord", (data) => {
      setRandomNum(rand(10, 1) * 50);
      setFlying(data.chat.chat);
      setLoading(0);
      console.log("randomNum", randomNum);
      let timer = setTimeout(() => {
        console.log("시간은 똑딲똑딱");
        setLoading(1);
      }, 1000);
    });
  }, [socket]);

  return (
    <GameContainer>
      {spin ? (<Spinner type={'page'} is_dim={true} width="200px" />) : ""}
      <LogoWrap>
        <LogoImg src={Logo} />
      </LogoWrap>
      {is_player ? (
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
            />
            <TeachingWrap>
              <TeachingB playerInfo={blackPlayer} socket={socket} />
              <TeachingW playerInfo={whitePlayer} socket={socket} />
            </TeachingWrap>
          </Wrap>
          <ChattingWrap>
            <Chatting gameNum={gameNum} socket={socket} userInfo={userInfo} is_player={is_player} />
          </ChattingWrap>
        </>
      ) : (
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
          <PlayerInfos>
            <>
              <PlayerCardW playerInfo={whitePlayer} />
            </>
            <>
              <PlayerCardB playerInfo={blackPlayer} />
            </>
          </PlayerInfos>
          <Omog
            userInfo={userInfo}
            gameNum={gameNum}
            socket={socket}
            blackPlayer={blackPlayer}
            whitePlayer={whitePlayer}
          />
          <ChattingWrap>
            <Chatting gameNum={gameNum} socket={socket} userInfo={userInfo} is_player={is_player} />
          </ChattingWrap>
        </>
      )}
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
  display: flex;
  flex-direction: column;
  padding: 120px 0px;
  margin: 0 20px;
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
  border-radius: 20px;
  background-color: #94d7bb;
  border: 2px solid black 
  text-align: center;
  animation-duration: 1s;
  animation-timing-fuction: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  zIndex: 9999;
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
