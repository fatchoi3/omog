import React, { useState, useRef, useEffect, memo } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { history } from "../redux/configureStore";
import { Text } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as gameActions } from "../redux/modules/game";

const Omog = memo((props) => {
  const dispatch = useDispatch();
  const userid = localStorage.getItem("userId");
  const gameNum = props.gameNum;
  const canvasRef = useRef(null);
  // const count = props.count;
  // const setCount =()=> props.setCount();
  // const socketRef = useRef();
  const socket= props.socket;
  const [X, setX] = useState();
  const [Y, setY] = useState();
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState();

  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(300);
  const timeout = useRef(null);

  const [min2, setMin2] = useState(5);
  const [sec2, setSec2] = useState(0);
  const time2 = useRef(300);
  const timeout2 = useRef(null);

  const [board, setBoard] = useState();

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
  // let board = new Array(Math.pow(19, 2)).fill(-1); // 144개의 배열을 생성해서 -1로 채움
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

    // let histories = new Array();
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

    // 바둑판 그리기 함수
    function draw() {
      ctx.fillStyle = "#e38d00";
      ctx.fillRect(0, 0, cw, ch);
      for (let x = 0; x < row; x++) {
        for (let y = 0; y < row; y++) {
          let w = (cw - margin * 2) / row;
          ctx.strokeStyle = "black";
          ctx.lineWidth = 1;
          ctx.strokeRect(w * x + margin, w * y + margin, w, w);
        }
      }
      // 화점에 점 찍기
      for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {
          ctx.fillStyle = "black";
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

    // 방금 둔 바둑돌에 사각 표시
    const drawRect = (x, y) => {
      let w = rowSize / 2;

      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        x * rowSize + margin - w,
        y * rowSize + margin - w,
        w + rowSize / 2,
        w + rowSize / 2
      );
    };
    //바둑알 그리기. 실제로는 바둑판까지 매번 통째로 그려줌
    const drawCircle = (x, y) => {
      const ctx = canvas.getContext("2d");
      draw();
      drawRect(x, y);
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
        }
      }

      checkWin(x, y); // 돌이 5개 연속 놓였는지 확인 함수 실행

      // let boardCopy = Object.assign([], board);
      // histories.push(boardCopy); //무르기를 위해서 판 전체 모양을 배열에 입력
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
    // 승리확인 함수 끝
    // 승리 화면 표시

    const winShow = (x) => {
      switch (x) {
        case 1:
          dispatch(
            gameActions.gameResultDB({
              result: { win: props.winnerB },
              userInfo: props.userInfo,
              gameNum: gameNum,
            })
          );
          console.log("흑 승");
          break;
        case 2:
          dispatch(
            gameActions.gameResultDB({
              result: { win: props.winnerW },
              userInfo: props.userInfo,
              gameNum: gameNum,
            })
          );
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
    console.log("여긴 그리기 유즈이펙");
  }, [count]);

  useEffect(() => {
    
    socket.on("omog", (data) => {
      console.log(
        "오목 소켓 받기");

      data.count % 2 == 0
        ? clearInterval(timeout.current)
        : clearInterval(timeout2.current);
      data.count % 2 == 0 ? timeOut2() : timeOut();

      setBoard(data.board);
      setY(data.y);
      setX(data.x);
      setOrder(data.order ? false : true);
      setCount(data.count);

      console.log("여기도 소켓유즈이팩에서 바꾼 후count", count);
    });
    
    return () => socket.off();
    // return () => socketRef.current.disconnect();
  }, []);

  
//시간 작동
  useEffect(() => {
    if (time.current < 0) {
      console.log("타임 아웃");
      clearInterval(timeout.current);
    }
    if (time2.current < 0) {
      console.log("타임 아웃");
      clearInterval(timeout2.current);
    }
  }, [sec, sec2]);

  useEffect(() => {
    if (
      props.userInfo.state == "whitePlayer" ||
      props.userInfo.state == "blackPlayer"
    ) {
      // 마우스 클릭한 위치를 정확한 눈금 위치로 보정
      document.addEventListener("mouseup", (e) => {
        // let ccount =0;
        if (e.target.id == "canvas") {
          let x = Math.round(Math.abs(e.offsetX - 30) / 33.3);
          //margin rowSize
          let y = Math.round(Math.abs(e.offsetY - 30) / 33.3);
          //   console.log(e.offsetX, e.offsetY, x, y);
          if (
            e.offsetX > 10 &&
            e.offsetX < 640 &&
            e.offsetY > 10 &&
            e.offsetY < 640
          ) {
            const data = { x, y, board, count, order };

            socket.emit("omog", data, props.userInfo.state);
            console.log("여긴 클릭! 들어가는데야", data);
            // }
          }
        }
      });
    }
  }, [props.userInfo.state]);

  return (
    <div>
      <GameWrap>
        <TimerWrapL count={count}>
          <TimeStoneL>
          <Text
            is_color={count % 2 == 0 ? "#F9FFBC" : "#619fcc"}
            is_size="25px"
          >
            {min}분 {sec}초
          </Text>
          </TimeStoneL>
        </TimerWrapL>
        <canvas ref={canvasRef} id="canvas" />
        <TimerWrapR count={count}>
          <Text
            is_color={count % 2 == 0 ? "#619fcc" : "#F9FFBC"}
            is_size="25px"
          >
            {min2}분 {sec2}초
          </Text>
        </TimerWrapR>
      </GameWrap>
    </div>
  );
});
const TimerWrapL = styled.div`
  height: 660px;
  width: 100px;
  margin: auto 20px;
  line-height: 660px;333333;
  background-color : ${(props) =>
    props.count % 2 == 0 ? "#619fcc" : "#F9FFBC"};
`;
const TimerWrapR = styled.div`
  height: 660px;
  width: 100px;
  margin: auto 20px;
  line-height: 660px;
  background-color: ${(props) =>
    props.count % 2 == 0 ? "#F9FFBC" : "#619fcc"};
`;
const GameWrap = styled.div`
  display: flex;
`;
const TimeStoneL=styled.div`
`;
const TimeStoneR=styled.div`
`;
export default Omog;
