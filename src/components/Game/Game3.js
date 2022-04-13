import React, { useState, useRef, useEffect, memo } from "react";
import styled from "styled-components";

import Spinner from "../../elements/Spinner";
import PlayerGame from "./PlayerGame";
import ObserverGame from "./ObserverGame";
import ErrorModal from "./ErrorModal";
import GameEnd from "./GameEnd";
import { Button, Text } from "../../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as gameActions } from "../../redux/modules/game";

const Game3 = memo((props) => {
  const dispatch = useDispatch();

  const [spin, setsping] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState("흑백");

  const userId = sessionStorage.getItem("userId");
  const gameNum = props.gameNum;
  const socket = props.socket;

  const userInfo = useSelector((state) => state.user.userInfo);
  const gameInfo = useSelector((state) => state.game.gameInfo);
  const roomName = useSelector((state) => state.game.roomName);

  const is_player =
    userInfo.state === "blackPlayer" || userInfo.state === "whitePlayer"
      ? true
      : false;

  const realGameInfo = gameInfo[0];
  const blackPlayer = realGameInfo.blackTeamPlayer[0];
  const whitePlayer = realGameInfo.whiteTeamPlayer[0];

  const Num =
    gameInfo[0].blackTeamObserver.length + gameInfo[0].whiteTeamObserver.length;

  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timeout = useRef(null);

  const [min2, setMin2] = useState(3);
  const [sec2, setSec2] = useState(0);
  const time2 = useRef(180);
  const timeout2 = useRef(null);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

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
      clearInterval(timeout.current);
      setWinner("흑돌 타임 승");
      setLoading(true);
      let timer = setTimeout(() => {
        dispatch(
          gameActions.gameResultDB({
            result: { win: blackPlayer.id, state: "blackPlayer" },
            userInfo: userInfo,
            gameNum: gameNum,
          })
        );
      }, 3000);
    }
    if (time2.current < 0) {
      clearInterval(timeout2.current);
      setWinner("백돌 타임 승");
      setLoading(true);
      let timer2 = setTimeout(() => {
        dispatch(
          gameActions.gameResultDB({
            result: { win: whitePlayer.id, state: "whitePlayer" },
            userInfo: userInfo,
            gameNum: gameNum,
          })
        );
      }, 3000);
    }
  }, [sec, sec2]);

  return (
    <GameContainer>
      <GameEnd open={loading} winner={winner} />
      <AllTitle>
        <RoomTitle>
          <Number>
            <Text is_size="1.17vw" is_margin=" 1.17vw 0.59vw" is_bold>
              방 번호 {gameNum}
            </Text>
          </Number>
          <RoomName>
            <Text is_size="1.17vw" is_margin=" 1.17vw 0.59vw" is_bold>
              {roomName}
            </Text>
          </RoomName>
          <Member>
            <Text is_size="1.17vw" is_margin=" 1.17vw 0.59vw" is_bold>
              관전자 수 {Num} 명
            </Text>
          </Member>
        </RoomTitle>
        <Button
          is_width="8.79vw"
          is_height="2.93vw"
          is_margin="0.59vw 0 0 2.93vw"
          is_size="0.94vw"
          is_border="none"
          is_radius="0.88vw"
          is_cursor
          is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
          _onClick={() => {
            openModal();
          }}
        >
          {" "}
          오류 보내기{" "}
        </Button>
      </AllTitle>
      <ErrorModal
        open={modalOpen}
        close={closeModal}
        gameInfo={gameInfo}
        gameNum={gameNum}
        userInfo={userInfo}
      />
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
  justify-content: space-between;
`;

const RoomTitle = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  width: 700px;
  margin: 2px 0 2px 10px;
`;
const Number = styled.div`
  border-right: 2px solid black;
  width: 200px;
  background-color: #94d7bb;
  border-radius: 10px 0 0 10px;
`;
const RoomName = styled.div`
  width: 300px;
`;
const Member = styled.div`
  border-left: 2px solid black;
  width: 200px;
  background-color: #f2f2f2;
  border-radius: 0 10px 10px 0;
`;
const AllTitle = styled.div`
  display: flex;
  position: absolute;
`;
export default Game3;
