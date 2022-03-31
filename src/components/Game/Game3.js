import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import styled, { keyframes } from "styled-components";

import Spinner from "../../elements/Spinner";
import PlayerGame from "./PlayerGame";
import ObserverGame from "./ObserverGame";

import { Text } from "../../elements";
import useSocket from "../../hook/useSocket";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as gameActions } from "../../redux/modules/game";

const Game3 = memo((props) => {
  const dispatch = useDispatch();
  const [spin, setsping] = useState(true);
  const userInfo = useSelector((state) => state.user.userInfo);
  const gameInfo = useSelector((state) => state.game.gameInfo);
  const userId = localStorage.getItem("userId");
  const gameNum = props.gameNum;
  const socket =props.socket;
  const roomName = useSelector((state) => state.game.roomName);
  const is_player =
    userInfo.state === "blackPlayer" || userInfo.state === "whitePlayer"
      ? true
      : false;

  const realGameInfo = gameInfo[0];
  const boardColor = gameInfo[1].boardColor;
  console.log("방 이름", gameInfo,is_player,boardColor);
  const blackPlayer = realGameInfo.blackTeamPlayer[0];
  const whitePlayer = realGameInfo.whiteTeamPlayer[0];
  
const Num = gameInfo[0].blackTeamObserver.length +gameInfo[0].whiteTeamObserver.length;

  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timeout = useRef(null);

  const [min2, setMin2] = useState(3);
  const [sec2, setSec2] = useState(0);
  const time2 = useRef(180);
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


  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(gameActions.getGameDB(gameNum));
      dispatch(userActions.loginCheckDB(userId));
      setsping(false);
    }, 1500);
  }, []);
  //시간 작동
  useEffect(() => {
    if (time.current < 0) {
      console.log("타임 아웃1");
      dispatch(
        gameActions.gameResultDB({
          result: { win: blackPlayer.id ,state : "blackPlayer"},
          userInfo: userInfo,
          gameNum: gameNum,
        })
      );
      clearInterval(timeout.current);
    }
    if (time2.current < 0) {
      console.log("타임 아웃2");
      dispatch(
        gameActions.gameResultDB({
          result: { win: whitePlayer.id , state : "whitePlayer" },
          userInfo: userInfo,
          gameNum: gameNum,
        })
      );
      clearInterval(timeout2.current);
    }
  }, [sec, sec2]);

  return (
    <GameContainer>
      <RoomTitle>
        <Number>
          <Text is_size="20px" is_margin=" 20px 10px" is_bold>방 번호 {gameNum}</Text>
          
          </Number>
      <RoomName>
        <Text is_size="20px" is_margin=" 20px 10px" is_bold>
          {roomName}
        </Text>
      </RoomName>
      <Member> 
      <Text is_size="20px" is_margin=" 20px 10px" is_bold >관전자 수 {Num} 명</Text>
      </Member>
      </RoomTitle>
      {spin ? <Spinner type={"page"} is_dim={true} width="200px" /> : ""}
      {is_player ? (
        <>
          <PlayerGame
            socket={socket}
            blackPlayer={blackPlayer}
            whitePlayer={whitePlayer}
            userInfo={userInfo}
            gameNum={gameNum}
            min={min}
            min2={min2}
            sec={sec}
            sec2={sec2}
            timeout={timeout}
            timeout2={timeout2}
            timeOut={timeOut}
            timeOut2={timeOut2}
          />
        </>
      ) : (
        <>
          <ObserverGame
            socket={socket}
            blackPlayer={blackPlayer}
            whitePlayer={whitePlayer}
            userInfo={userInfo}
            gameNum={gameNum}
            min={min}
            min2={min2}
            sec={sec}
            sec2={sec2}
            timeout={timeout}
            timeout2={timeout2}
            timeOut={timeOut}
            timeOut2={timeOut2}
          />
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

const RoomTitle = styled.div`
border : 2px solid black;
border-radius : 10px;
display : flex;
position : absolute;
width : 700px;
margin : 2px 0 2px 10px;
`;
const Number = styled.div`
border-right : 2px solid black;
width: 200px;
background-color : #94D7BB;
border-radius :  10px 0 0 10px ;
`;
const RoomName = styled.div`
  
  width: 300px;
`;
const Member =styled.div`
border-left : 2px solid black;
width: 200px;
background-color : #f2f2f2;
border-radius : 0 10px 10px 0;
`;
export default Game3;
