import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import Swal from 'sweetalert2';
import api from "../../api/api";
import * as Sentry from "@sentry/react";

const TimerCheck = (time) => {
  let answer;
  if (time === "2 : 00") {
    answer = 2;
    console.log(answer);
    return answer;
  }
  if (time === "3 : 00") {
    answer = 3;
    console.log(answer);
    return answer;
  }
  if (time === "5 : 00") {
    answer = 5;
    console.log(answer);
    return answer;
  }
};

// initialState
const initialState = {
  gameInfo: [
    {
      gameNum: 2,
      blackTeamPlayer: {
        id: "testB",
        score: [{ win: 0 }, { lose: 0 }],
        point: 10000,
      },
      whiteTeamPlayer: {
        id: "testW",
        score: [{ win: 0 }, { lose: 0 }],
        point: 10002,
      },
      timer: 5,
      blackTeamObserver: ["a", "b", "c", "d"],
      whiteTeamObserver: ["e", "f", "d", "w"],
    },
    {
      boardColor: 1
    }
  ],
  userInfo: {
    id: "",
    score: [{ win: 0 }, { lose: 0 }],
    point: 0,
  },
  chat_list: [],
  Teaching_listB: [],
  Teaching_listW: [],
  result: { win: "" },
  gameResult: {
    win: [],
    lose: [],
    result: {},
  },
  PP: { pointer: false, power: false },
  time: 5,
  roomName: "잘 지내니...?",
};

// actions
const GETGAME = "GETGAME";
const GET_GAME_RESULT = "GET_GAME_RESULT";
const GAMEEND = "GAMEEND";
const GAME_ADD_CHAT = "GAME_ADD_CHAT";
const CLEAR_ONE = "CLEAR_ONE";
const ADD_TEACHING_W = "ADD_TEACHING_W";
const ADD_TEACHING_B = "ADD_TEACHING_B";
const TIME = "TIME";
const ROOMNAME = "ROOMNAME";

// action creators
const getGame = createAction(GETGAME, (gameInfo) => ({ gameInfo }));
const getGameResult = createAction(GET_GAME_RESULT, (result) => ({ result }));
const GameEnd = createAction(GAMEEND, (result) => ({ result }));
const GameAddChat = createAction(GAME_ADD_CHAT, (chat) => ({ chat }));
const AddTeachingW = createAction(ADD_TEACHING_W, (chat) => ({ chat }));
const AddTeachingB = createAction(ADD_TEACHING_B, (chat) => ({ chat }));
const time = createAction(TIME, (time) => ({ time }));
const RoomName = createAction(ROOMNAME, (roomName) => ({ roomName }));
const clearOne = createAction(CLEAR_ONE);

// middleware actions

const getGameDB = (gameNum, isMount) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.get(`/game/start/${gameNum}`);

      console.log("gameInfo 미들웨어", res);
      dispatch(getGame(res.data.gameInfo));
      dispatch(RoomName(res.data.gameName.gameName));
      console.log("gameInfo time", res.data.gameInfo[0].timer);
      dispatch(time(res.data.gameInfo[0].timer));
         }
       catch(error) {
        Sentry.captureException(error);
      };
  };
};
const sendError = (result) => {
  return function (dispatch, useState, { history }) {
    console.log(result);
    api
      .post("/game/bugreport", result)
      .then(function (response) {
        console.log(response);
      })
      .catch((error) => {
        Sentry.captureException(error);
      });
  };
};
const gameResultDB = (result) => {
  return function (dispatch, useState, { history }) {
    history.push(`/game/result/${result.gameNum}`);
    console.log(result);
    api
      .post("/gameFinish", result)
      .then(function (response) {
        dispatch(GameEnd(result));
      })
      .catch((error) => {
        Sentry.captureException(error);
      });
  };
};

const getGameResultDB = (userId, gameNum, result) => {
  return async function (dispatch, getState, { history }) {
    console.log(userId, gameNum, result);
    try {
      const res = await api.post(`/gameFinish/show`, {
        id: userId,
        gameNum: gameNum,
        result,
      });
      console.log(res);
      dispatch(getGameResult(res.data));
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '게임 결과창 가져오기 실패',
        text: `${error}`,
      });
      Sentry.captureException(error);
    }
  };
};

const gameOutDB = (gameNum) => {
  return async function (dispatch, getState, { history }) {
    console.log("gameNum", gameNum);
    try{
      const res = await api.delete(`/game/delete/${gameNum}`)
      console.log(res);
    }  catch (error){
      Sentry.captureException(error);
    }        
  };
};

const addGameChat = (socket) => {
  return async function (dispatch, getState, { history }) {
    await socket.on("chat", (data, state) => {
      let array = { id: data.name, message: data.chat.chat, state };
      console.log("채팅받아오기", array);
      dispatch(GameAddChat(array));
    });
  };
};
const AddTeachB = (socket) => {
  return async function (dispatch, getState, { history }) {
    await socket.on("teachingB", (data) => {
      let array = { id: data.name, message: data.chat.chat };
      console.log("채팅받아오기B", array);
      dispatch(AddTeachingB(array));
    });
  };
};
const AddTeachW = (socket) => {
  return async function (dispatch, getState, { history }) {
    await socket.on("teachingW", (data) => {
      let array = { id: data.name, message: data.chat.chat };
      console.log("채팅받아오기W", array);
      dispatch(AddTeachingW(array));
    });
  };
};
const PointerSocket = (socket) => {
  return async function (dispatch, getState, { history }) {
    await socket.on("Pointer", (data, chat) => {
      let array = { id: "신의한수", message: chat.chat };
      console.log("신의한수", chat);
      dispatch(GameAddChat(array));
    });
  };
};

//reducer
export default handleActions(
  {
    [GETGAME]: (state, action) =>
      produce(state, (draft) => {
        draft.gameInfo = action.payload.gameInfo;
        console.log("action.payload.gameInfo", action.payload.gameInfo);
      }),
    [GET_GAME_RESULT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.result);
        draft.gameResult = action.payload.result;
      }),
    [GAMEEND]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.result);
        draft.result = action.payload.result;
        console.log("game end 리듀서예요.", action.payload.result);
      }),
    [GAME_ADD_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list.push(action.payload.chat);
        console.log("메세지.", action.payload.chat);
      }),
    [ADD_TEACHING_B]: (state, action) =>
      produce(state, (draft) => {
        draft.Teaching_listB.push(action.payload.chat);
      }),
    [ADD_TEACHING_W]: (state, action) =>
      produce(state, (draft) => {
        draft.Teaching_listW.push(action.payload.chat);
      }),
    [TIME]: (state, action) =>
      produce(state, (draft) => {
        console.log(
          "action.payload.time",
          TimerCheck(action.payload.time),
          action.payload.time
        );

        draft.time = TimerCheck(action.payload.time);
      }),
    [ROOMNAME]: (state, action) =>
      produce(state, (draft) => {
        console.log("action.payload.roomName", action.payload.roomName);

        draft.roomName = action.payload.roomName;
      }),
    [CLEAR_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = [];
        draft.Teaching_listB = [];
        draft.Teaching_listW = [];
        draft.tiem = "";
      }),
  },
  initialState
);

const actionCreators = {
  getGameDB,
  getGameResultDB,
  gameOutDB,
  gameResultDB,
  addGameChat,
  clearOne,
  AddTeachB,
  AddTeachW,
  PointerSocket,
  sendError
};

export { actionCreators };
