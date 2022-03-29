import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as gameActions } from "../redux/modules/game";

import Game2 from "../components/Game/Game2";
import Game3 from "../components/Game/Game3";
import Game5 from "../components/Game/Game5";

const GameStart = (props) => {
  const dispatch = useDispatch();
  let timetime = useSelector((state) => state.game.time);

  const gameNum = props.match.params.roomNum;
  console.log("선택해", timetime, gameNum);
  useEffect(() => {
    dispatch(userActions.clearOne);
    let timer = setTimeout(() => {
      dispatch(gameActions.getGameDB(gameNum));
    }, 1000);
  }, []);

  if (timetime === 2) {
    return (
      <>
        <Game2 gameNum={gameNum} />
      </>
    );
  }
  if (timetime === 3) {
    return (
      <>
        <Game3 gameNum={gameNum} />
      </>
    );
  }
  if (timetime === 5) {
    return (
      <>
        <Game5 gameNum={gameNum} />
      </>
    );
  }
};
export default GameStart;
