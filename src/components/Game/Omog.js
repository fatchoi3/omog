import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import styled from "styled-components";

import { Text } from "../../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as gameActions } from "../../redux/modules/game";

import Swal from "sweetalert2";
import GameEnd from "./GameEnd";

const Omog = memo(
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
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [winner, setWinner] = useState("흑백");

    const [X, setX] = useState();
    const [Y, setY] = useState();
    const [count, setCount] = useState();
    const [board, setBoard] = useState();

    const [pointer, setPointer] = useState();

    const userid = sessionStorage.getItem("userId");
    const canvasRef = useRef(null);

    const boardColorNum = useSelector((state) =>
      state.game.gameInfo[1] ? state.game.gameInfo[1].boardColor : 1
    );
    const boardColorChoice = (num) => {
      let answer1;
      let answer2;
      if (num == 1) {
        answer1 = "#E08C4F";
        answer2 = "black";
        return [answer1, answer2];
      }
      if (num == 2) {
        answer1 = "#D3EAE0";
        answer2 = "#00858C";
        return [answer1, answer2];
      }
      if (num == 3) {
        answer1 = "#FFD7E7";
        answer2 = "#F97DB6";
        return [answer1, answer2];
      }
      if (num == 4) {
        answer1 = "#D9E4F4";
        answer2 = "#8DB0DB";
        return [answer1, answer2];
      }
      if (num == 5) {
        answer1 = "#DDDDDD";
        answer2 = "#727272";
        return [answer1, answer2];
      }
      if (num == 6) {
        answer1 = "#8E8E8E";
        answer2 = "#CCCCCC";
        return [answer1, answer2];
      }
    };
    const boardColor = boardColorChoice(boardColorNum)[0];
    const boardLine = boardColorChoice(boardColorNum)[1];

    const is_player =
      userInfo.state === "blackPlayer" || userInfo.state === "whitePlayer"
        ? true
        : false;

    //이벤트 제거할 때 사용
    const OP = document.getElementById("canvas");

    const omoging = useCallback((a) => {
      document.addEventListener("mouseup", (e) => {
        if (e.target.id == "canvas") {
          let x = Math.round(Math.abs(e.offsetX - 30) / 33.3);
          let y = Math.round(Math.abs(e.offsetY - 30) / 33.3);
          if (
            e.offsetX > 10 &&
            e.offsetX < 640 &&
            e.offsetY > 10 &&
            e.offsetY < 640
          ) {
            const data = { x, y, board, count };
            console.log("소켓전 ", a);
            a++;
            let timer = setTimeout(() => {
              socket.emit("omog", data, userInfo.state, gameNum);
            }, 100);
            console.log("난플레이어야", a, e);
          }
        }
      });
      document.removeEventListener("mouseup", OP);
    }, []);

    const pointerTeaching = useCallback(() => {
      document.addEventListener("mouseup", (e) => {
        if (e.target.id == "canvas") {
          let x = Math.round(Math.abs(e.offsetX - 30) / 33.3);
          let y = Math.round(Math.abs(e.offsetY - 30) / 33.3);
          if (
            e.offsetX > 10 &&
            e.offsetX < 640 &&
            e.offsetY > 10 &&
            e.offsetY < 640
          ) {
            const data = { x, y, board };
            console.log("pointer", pointer);
            socket.emit("pointerOmog", data, gameNum);
            console.log("안녕난 훈수야");
          }
        }
      });
    }, []);

    useEffect(() => {
      let SS = 0;
      if (
        userInfo.state === "whitePlayer" ||
        userInfo.state === "blackPlayer"
      ) {
        omoging(SS);
      }
      return () => {
        document.removeEventListener("mouseup", OP);
      };
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;

      const margin = 30;
      canvas.width = 600 + margin * 2;
      canvas.height = 600 + margin * 2;

      const cw = 600 + margin * 2;
      const ch = 600 + margin * 2;
      const row = 18; // 바둑판 선 개수
      const rowSize = 600 / row; // 바둑판 한 칸의 너비
      const dolSize = 15; // 바둑돌 크기

      const checkDirection = [
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
        [0, -1],
      ];

      const ctx = canvas.getContext("2d");

      // 오목판 그리기 함수
      function draw() {
        ctx.fillStyle = boardColor;
        ctx.fillRect(0, 0, cw, ch);
        for (let x = 0; x < row; x++) {
          for (let y = 0; y < row; y++) {
            let w = (cw - margin * 2) / row;
            ctx.strokeStyle = boardLine;
            ctx.lineWidth = 1;
            ctx.strokeRect(w * x + margin, w * y + margin, w, w);
          }
        }
        // 오목판에 점 찍기
        for (let a = 0; a < 3; a++) {
          for (let b = 0; b < 3; b++) {
            ctx.fillStyle = boardLine;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(
              (3 + a) * rowSize + margin + a * 5 * rowSize,
              (3 + b) * rowSize + margin + b * 5 * rowSize,
              dolSize / 3,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }

      // 방금 둔 오목돌 표시
      const drawRect = (x, y) => {
        let w = rowSize / 2;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.strokeRect(
          x * rowSize + margin - w / 4,
          y * rowSize + margin - w / 4,
          w / 2,
          w / 2
        );
      };
      //오목알 그리기. 실제로는 오목판까지 매번 통째로 그려줌
      const drawCircle = (x, y) => {
        const ctx = canvas.getContext("2d");
        draw();

        for (let i = 0; i < 361; i++) {
          // 모든 눈금의 돌의 유무,색깔 알아내기
          let a = indexToXy(i)[0];
          let b = indexToXy(i)[1];
          if (board) {
            if (board[xyToIndex(a, b)] == 1) {
              ctx.fillStyle = "black";
              ctx.beginPath();
              ctx.arc(
                a * rowSize + margin,
                b * rowSize + margin,
                dolSize,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
            if (board[xyToIndex(a, b)] == 2) {
              ctx.fillStyle = "white";
              ctx.beginPath();
              ctx.arc(
                a * rowSize + margin,
                b * rowSize + margin,
                dolSize,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
            if (board[xyToIndex(a, b)] == 3) {
              ctx.fillStyle = "red";
              ctx.beginPath();
              ctx.arc(
                a * rowSize + margin,
                b * rowSize + margin,
                dolSize,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          }
        }
        drawRect(x, y); // 방금 둔 오목돌 표시
        checkWin(x, y); // 돌이 5개 연속 놓였는지 확인 함수 실행
      };

      // 승패 판정 함수
      function checkWin(x, y) {
        let thisColor = board[xyToIndex(x, y)]; // 마지막 둔 돌의 색깔이 1(흑),2(백)인지...
        //가로,세로와 대각선 두 방향, 총 네 방향 체크
        for (let k = 0; k < 4; k++) {
          let winBlack = 1;
          let winWhite = 1;
          // 놓여진 돌의 양쪽 방향으로
          for (let j = 0; j < 2; j++) {
            // 5개씩의 돌의 색깔을 확인
            for (let i = 1; i < 5; i++) {
              let a = x + checkDirection[k + 4 * j][0] * i;
              let b = y + checkDirection[k + 4 * j][1] * i;

              if (board[xyToIndex(a, b)] == thisColor) {
                if (
                  k === 1 &&
                  parseInt(xyToIndex(a, b) / 19) !==
                    parseInt(xyToIndex(x, y) / 19)
                ) {
                  continue;
                }
                // 색깔에 따라서 흑,백의 숫자를 하나씩 증가
                switch (thisColor) {
                  case 1:
                    winBlack++;
                    break;
                  case 2:
                    winWhite++;
                    break;
                  default:
                    console.log("누구세...요?");
                    break;
                }
              } else {
                break;
              }
            }
          }
          // 연속 돌이 5개이면 승리
          if (winBlack == 5) {
            winShow(1);
          }
          if (winWhite == 5) {
            winShow(2);
          }
        }
      }
      const winShow = (x) => {
        switch (x) {
          case 1:
            clearInterval(timeout.current);
            setWinner("흑돌 승");
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
            console.log("흑 승");
            break;
          case 2:
            clearInterval(timeout2.current);
            setWinner("백돌 승");
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
            console.log("백 승");
            break;
          default:
            console.log("누구세...요?");
            break;
        }
      };
      // x,y 좌표를 배열의 index값으로 변환
      let xyToIndex = (x, y) => {
        return x + y * (row + 1);
      };
      // 배열 index값을 x,y좌표로 변환
      let indexToXy = (i) => {
        let w = Math.sqrt(361);
        let x = i % w;
        let y = Math.floor(i / w);
        return [x, y];
      };

      draw();
      if (board) {
        drawCircle(X, Y);
      }
    }, [count, pointer]);

    const Timer1 = useCallback((a) => {
      clearInterval(a);
      console.log("짠", a);
      timeOut2();
    }, []);

    const Timer2 = useCallback((a) => {
      clearInterval(a);
      console.log("짠2", a);
      timeOut();
    }, []);

    useEffect(() => {
      socket.on("omog", (data, checkSamsam, state) => {
        if (checkSamsam === 0 && userInfo.state === state) {
          Swal.fire({
            title: "금수입니다!!",
            icon: "error",
            confirmButtonText: "Ok",
          });
          return;
        }
        if (checkSamsam === 0) {
          return;
        }
        console.log("오목 소켓 받기", data.count);

        data.count % 2 === 0
          ? Timer1(timeout.current)
          : Timer2(timeout2.current);

        setBoard(data.board);
        setY(data.y);
        setX(data.x);
        setCount(data.count);

        console.log("여기도 소켓유즈이팩에서 바꾼 후count", data.count);
      });

      return () => socket.off();
    }, [socket]);

    useEffect(() => {
      socket.on("pointerOmog", (data, count, pointer) => {
        console.log("pointer 훈수 소켓 받기");

        setBoard(data.board);
        setX(data.x);
        setY(data.y);
        setPointer(pointer);
        setCount(count);

        console.log("pointer 훈수 후");
      });
    }, [socket]);

    useEffect(() => {
      socket.on("Pointer", (data, chat) => {
        console.log("data.name", data.name);
        if (userid === data.name && data.pointer) {
          console.log("맞아 나야");
          pointerTeaching();
          return;
        }

        console.log("내가 아냐", data.pointer);
      });
    }, [socket]);

    useEffect(() => {
      socket.on("byebye", (state, id) => {
        console.log("state", state);
        if (state === "blackPlayer") {
          dispatch(
            gameActions.gameResultDB({
              result: { win: id, state: "whitePlayer" },
              userInfo: userInfo,
              gameNum: gameNum,
            })
          );
        }
        if (state === "whitePlayer") {
          console.log("userInfo", userInfo);
          dispatch(
            gameActions.gameResultDB({
              result: { win: id, state: "blackPlayer" },
              userInfo: userInfo,
              gameNum: gameNum,
            })
          );
        }
      });
    }, [socket]);

    return (
      <div>
        <GameEnd open={loading} winner={winner} />
        <GameWrap>
          {is_player ? (
            <>
              <TimerWrapL count={count}>
                <TimeStoneL min2={min2} sec2={sec2}>
                  <Text
                    is_bold
                    is_margin="auto 0"
                    is_color={min2 === 0 && sec2 <= 15 ? "red" : "white"}
                    is_size="25px"
                  >
                    {min2}: {sec2}
                  </Text>
                </TimeStoneL>
              </TimerWrapL>
              <canvas ref={canvasRef} id="canvas" />
              <TimerWrapR count={count}>
                <TimeStoneR min={min} sec={sec}>
                  <Text
                    is_bold
                    is_margin="auto 0"
                    is_color={min === 0 && sec <= 15 ? "red" : "black"}
                    is_size="25px"
                  >
                    {min}: {sec}
                  </Text>
                </TimeStoneR>
              </TimerWrapR>
            </>
          ) : (
            <>
              <ObserverOmog>
                <canvas ref={canvasRef} id="canvas" />
              </ObserverOmog>
            </>
          )}
        </GameWrap>
      </div>
    );
  }
);
const TimerWrapL = styled.div`
  height: 660px;
  width: 150px;
  line-height: 90px;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.count % 2 == 0 ? "#F6F6F6" : "#C4C4C4"};
`;
const TimerWrapR = styled.div`
  height: 660px;
  width: 150px;
  line-height: 90px;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.count % 2 == 0 ? "#C4C4C4" : "#F6F6F6"};
`;
const GameWrap = styled.div`
  display: flex;
`;
const TimeStoneL = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: black;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
const TimeStoneR = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  border: 2px solid black;
  margin: 0 auto;
`;
const ObserverOmog = styled.div`
  width: 680px;
  height: 680px;
  margin: 100px auto;
  padding: 25px 15px 10px 30px;
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.25);
`;
export default Omog;
