import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";


// initialState
const initialState = {
    gameInfo: {
        gameNum: 2,
        blackTeamPlayer: {
            id: "testB",
            score: [
                { win: 0 },
                { lose: 0 }
            ],
            point: 10000
        },
        whiteTeamPlayer: {
            id: "testW",
            score: [
                { win: 0 },
                { lose: 0 }
            ],
            point: 10002
        },
        blackTeamObserver: ["a", "b", "c", "d"],
        whiteTeamObserver: ["e", "f", "d", "w"]
    },
    userInfo: {
        id: "",
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 0
    },
    chat_list: [],
    Teaching_listB: [],
    Teaching_listW: [],
    result: { win: '' },
    gameresult: {
        gameInfo: {},
        userInfo: {},
        result: {}
    },
}

// actions
const GETGAME = "GETGAME";
const GET_GAME_RESULT = "GET_GAME_RESULT";
const GAMEEND = "GAMEEND";
const GAME_ADD_CHAT = "GAME_ADD_CHAT";
const CLEAR_ONE = "CLEAR_ONE";
const ADD_TEACHING_W = "ADD_TEACHING_W";
const ADD_TEACHING_B = "ADD_TEACHING_B";


// action creators
const getGame = createAction(GETGAME, (gameInfo) => ({ gameInfo }));
const getGameResult = createAction(GET_GAME_RESULT, (result) => ({ result }));
const GameEnd = createAction(GAMEEND, (result) => ({ result }));
const GameAddChat = createAction(GAME_ADD_CHAT, (chat) => ({ chat }));
const AddTeachingW = createAction(ADD_TEACHING_W, (chat) => ({ chat }));
const AddTeachingB = createAction(ADD_TEACHING_B, (chat) => ({ chat }));
const clearOne = createAction(CLEAR_ONE);


// middleware actions

const getGameDB = (gameNum) => {
    return async function (dispatch, getState, { history }) {
        console.log("gameNum", gameNum)
        await api.get(`/game/start/${gameNum}`)
            .then(function (response) {
                console.log("gameInfo 미들웨어", response.data.gameInfo);
                dispatch(getGame(response.data.gameInfo));
            })
    }
};

const gameResultDB = (result) => {
    console.log("result", result)
    return async function (dispatch, useState, { history }) {
        // const token = localStorage.getItem('token');
        history.push(`/game/result/${result.gameNum}`);
        console.log(result)
        await api.post("/gameFinish", result)
            .then(function (response) {

                dispatch(GameEnd(result));

            }).catch(error => {

                console.log(error)
            });
    }
};


const getGameResultDB = (userId, gameNum, result) => {
    return async function (dispatch, getState, { history }) {
        console.log(userId, gameNum, result)
        try {
            const res = await api.post(`/gameFinish/show`, { id: userId, gameNum: gameNum, result })
            console.log(res);
            dispatch(getGameResult(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}


const gameOutDB = (gameNum) => {
    return async function (dispatch, getState, { history }) {
        console.log("gameNum", gameNum);
        await api.delete(`/game/delete/${gameNum}`)
            .then(function (response) {
                console.log(response);
                history.push("/main");
            })
    }
};


const addGameChat = (socket) => {
    return async function (dispatch, getState, { history }) {
        await socket.on("chat", (data) => {
            let array = { id: data.name, message: data.chat.chat }
            console.log("채팅받아오기", array)
            dispatch(GameAddChat(array));
        })
    }
};
const AddTeachB = (socket) => {
    return async function (dispatch, getState, { history }) {
        await socket.on("teachingB", (data) => {
            let array = { id: data.name, message: data.chat.chat }
            console.log("채팅받아오기B", array)
            dispatch(AddTeachingB(array));
        })
    }
};
const AddTeachW = (socket) => {
    return async function (dispatch, getState, { history }) {
        await socket.on("teachingW", (data) => {
            let array = { id: data.name, message: data.chat.chat }
            console.log("채팅받아오기W", array)
            dispatch(AddTeachingW(array));
        })
    }
};


//reducer
export default handleActions({
    [GETGAME]: (state, action) => produce(state, (draft) => {
        draft.gameInfo = action.payload.gameInfo
        console.log("action.payload.gameInfo", action.payload.gameInfo)
    }),
    [GET_GAME_RESULT]: (state, action) => produce(state, (draft) => {
        console.log(action.payload.result)
        draft.gameresult = action.payload.result;
    }),
    [GAMEEND]: (state, action) => produce(state, (draft) => {
        console.log(action.payload.result)
        draft.result = action.payload.result
        console.log("game end 리듀서예요.", action.payload.result)
    }),
    [GAME_ADD_CHAT]: (state, action) => produce(state, (draft) => {
        draft.chat_list.push(action.payload.chat);
        // /console.log("action.payload.chat",action.payload.chat)
    }),
    [ADD_TEACHING_B]: (state, action) => produce(state, (draft) => {
        draft.Teaching_listB.push(action.payload.chat);
        console.log("action.payload.chat", action.payload.chat)
    }),
    [ADD_TEACHING_W]: (state, action) => produce(state, (draft) => {
        draft.Teaching_listW.push(action.payload.chat);
        console.log("action.payload.chat", action.payload.chat)
    }),
    [CLEAR_ONE]: (state, action) =>
        produce(state, (draft) => {
            draft.chat_list = [];
            draft.Teaching_listB = [];
            draft.Teaching_listW = [];
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
    AddTeachW
}

export { actionCreators };