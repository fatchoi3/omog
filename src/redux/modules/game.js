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
    PP: { pointer: false, power: false }
}

// actions
const GETGAME = "GETGAME";
const GET_GAME_RESULT = "GET_GAME_RESULT";
const GAMEEND = "GAMEEND";
const GAME_ADD_CHAT = "GAME_ADD_CHAT";
const CLEAR_ONE = "CLEAR_ONE";
const ADD_TEACHING_W = "ADD_TEACHING_W";
const ADD_TEACHING_B = "ADD_TEACHING_B";
// const POINTER_TEACHING="POINTER_TEACHING";

// action creators
const getGame = createAction(GETGAME, (gameInfo) => ({ gameInfo }));
const getGameResult = createAction(GET_GAME_RESULT, (result) => ({ result }));
const GameEnd = createAction(GAMEEND, (result) => ({ result }));
const GameAddChat = createAction(GAME_ADD_CHAT, (chat) => ({ chat }));
const AddTeachingW = createAction(ADD_TEACHING_W, (chat) => ({ chat }));
const AddTeachingB = createAction(ADD_TEACHING_B, (chat) => ({ chat }));
// const pointerTeaching =createAction(POINTER_TEACHING,(PP)=>({PP}))
const clearOne = createAction(CLEAR_ONE);


// middleware actions

const getGameDB = (gameNum) => {
    return function (dispatch, getState, { history }) {
        api.get(`/game/start/${gameNum}`)
            .then(function (response) {
                console.log("gameInfo 미들웨어", response.data.gameInfo);
                dispatch(getGame(response.data.gameInfo));
            }).catch(error => {

                console.log(error)
            });
    }
};

const gameResultDB = (result) => {
    return function (dispatch, useState, { history }) {
        history.push(`/game/result/${result.gameNum}`);
        console.log(result)
        api.post("/gameFinish", result)
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
    return function (dispatch, getState, { history }) {
        console.log("gameNum", gameNum);
        api.delete(`/game/delete/${gameNum}`)
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

// const pointerTeachingS = (socket) => {
//     const userid = localStorage.getItem("userId");
//     return async function (dispatch, getState, { history }) {
//         await socket.on("Pointer", (id) => {
//             let PP= {power : false, pointer : false}
//             if(userid === id) {
//                 console.log("맞아 나야"); 
//                 PP={power : true, pointer: true}
//                 dispatch(pointerTeaching(PP));
//                 return;
//               }
//               console.log("내가아니야")
//               PP={power : false, pointer:true}
//               dispatch(pointerTeaching(PP));
//         })
//     }
// };


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

    }),
    [ADD_TEACHING_W]: (state, action) => produce(state, (draft) => {
        draft.Teaching_listW.push(action.payload.chat);

    }),
    // [POINTER_TEACHING]: (state, action) => produce(state, (draft) => {
    //     draft.PP=(action.payload.PP);
    //     console.log("액션PP", action.payload.PP)
    // }),
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
    AddTeachW,
    // pointerTeachingS
}

export { actionCreators };