import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import styled, { keyframes } from "styled-components";


import Spinner from "../elements/Spinner";
import PlayerGame from "../components/PlayerGame";
import ObserverGame from "../components/ObserverGame";



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

  // console.log("가져오기gameInfo", gameInfo);

  const realGameInfo = gameInfo[0];
  // console.log("realGameInfo", realGameInfo);
  const blackPlayer = realGameInfo?.blackTeamPlayer[0];
  const whitePlayer = realGameInfo?.whiteTeamPlayer[0];
  // console.log("blackTeamPlayer", blackPlayer);
  // console.log("whiteTeamPlayer", whitePlayer);

  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(300);
  const timeout = useRef(null);

  const [min2, setMin2] = useState(5);
  const [sec2, setSec2] = useState(0);
  const time2 = useRef(300);
  const timeout2 = useRef(null);


  const timeOut = () => {
    timeout.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);
  };

  const timeOut2 = () => {
    timeout2.current = setInterval(() => {
      setMin2(parseInt(time2.current / 60));
      setSec2(time2.current % 60);
      time2.current -= 1;
    }, 1000);
  };


  //https://haksae90.shop/game
  //"https://localhost:4001/game",
  const [socket, disconnectSocket] = useSocket(
    "https://haksae90.shop/game",
    gameNum,
    userId
  );

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);

  useEffect(() => {
    dispatch(userActions.clearOne);
    let timer = setTimeout(() => {

      dispatch(gameActions.getGameDB(gameNum));
      dispatch(userActions.loginCheckDB(userId));
      setsping(false)
    }, 1000)

  }, []);
   //시간 작동
   useEffect(() => {
    if (time.current < 0) {
      console.log("타임 아웃1");
      dispatch(
        gameActions.gameResultDB({
          result: { win: props.blackPlayer.id },
          userInfo: props.userInfo,
          gameNum: gameNum,
        })
      );
      clearInterval(timeout.current);
    }
    if (time2.current < 0) {
      console.log("타임 아웃2");
      dispatch(
        gameActions.gameResultDB({
          result: { win: props.whitePlayer.id },
          userInfo: props.userInfo,
          gameNum: gameNum,
        })
      );
      clearInterval(timeout2.current);
    }
  }, [sec, sec2]);

  

  return (
    <GameContainer>
      {spin ? (<Spinner type={'page'} is_dim={true} width="200px" />) : ""}
      {is_player ? (
        <>
          <PlayerGame 
          socket={socket} 
          blackPlayer={blackPlayer}
          whitePlayer={whitePlayer}
          userInfo={userInfo}
          gameNum={gameNum} 
          min={min} min2={min2} 
          sec={sec} sec2={sec2} 
          timeout={timeout} timeout2={timeout2}
          timeOut={timeOut} timeOut2={timeOut2} />
           
        </>
      ) : (
        <>
          <ObserverGame 
          socket={socket} 
          blackPlayer={blackPlayer}
          whitePlayer={whitePlayer}
          userInfo={userInfo}
          gameNum={gameNum} 
          min={min} min2={min2} 
          sec={sec} sec2={sec2} 
          timeout={timeout} timeout2={timeout2}
          timeOut={timeOut} timeOut2={timeOut2} />
          
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
export default Game;
