import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as gameActions } from "../redux/modules/game";
import useSocket from "../hook/useSocket";
import Game2 from "../components/Game/Game2";
import Game3 from "../components/Game/Game3";
import Game5 from "../components/Game/Game5";
import styled from "styled-components";

const GameStart = (props) => {
  const dispatch = useDispatch();
  let timetime = useSelector((state) => state.game.time);
  const gameNum = props.match.params.roomNum;
  const userId = localStorage.getItem("userId");
  const [socket, disconnectSocket] = useSocket(
    "https://haksae90.shop/game",
    gameNum,
    userId
  );
  
  console.log("선택해", timetime, gameNum);
  
  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(gameActions.getGameDB(gameNum));
    }, 1000);
  }, []);
  useEffect(() => {
    return () => {
      disconnectSocket();
      dispatch(gameActions.clearOne());
    };
  }, [disconnectSocket]);

  if (timetime === 2) {
    return (
      <Container>
        <Game2 gameNum={gameNum} socket={socket} />
      </Container>
    );
  }
  if (timetime === 3) {
    return (
      <Container>
        <Game3 gameNum={gameNum} socket={socket} />
      </Container>
    );
  }
  if (timetime === 5) {
    return (
      <Container>
        <Game5 gameNum={gameNum}  socket={socket}/>
      </Container>
    );
  }
};
const Container =styled.div`
width : 100vw;
height : 100vh;
box-sizing : border-box;
`;
export default GameStart;
