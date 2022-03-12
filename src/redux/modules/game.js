import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";

// initialState
const initialState = {
    gameInfo :{
        gameNum :2,
        blackPlayer : "test6",
        whitePlayer : "test5",
        blackObserverList : ["a", "b", "c", "d"],
        whiteObserverList : ["e", "f", "d", "w"]
    }
// const roomNum = 2;
        // const ;
        // const ;
        // const ;
        // const w;
}

// actions
const GETGAME = "GETGAME";
const GET_GAME_RESULT = "GET_GAME_RESULT";
const GAMEEND = "GAMEEND";


// action creators
const getGame = createAction(GETGAME, (gameInfo) => ({ gameInfo }));
const getGameResult = createAction(GET_GAME_RESULT, (result) => ({ result }));
const GameEnd = createAction(GAMEEND,(result)=>({result}));


// middleware actions

const getGameDB = (gameNum) =>{
    return async function ( dispatch, getState, { history }){
        await api.get( `/game/start/${gameNum}`)
        .then(function(response){
            console.log("낙지전골",response.data.gameInfo);
            dispatch(getGame(response.data.gameInfo));
        })
    }
};
const gameResultDB= (result)=>{
    console.log("result",result)
    return async function (dispatch, useState, { history }) {
        // const token = localStorage.getItem('token');
        await api.post("/gameFinish", result)
            .then(function (response) {
                console.log("안녕 나는 미들웨어 result야", response.data);
                history.push(`/game/result/${result.gameNum}`);
                dispatch(GameEnd(result));
            }).catch(error => {
                // window.alert("방참가 실패!");
                console.log(error)
            });
    }
};


const getGameResultDB = (result) => {
    return async function (dispatch, getState, { history }) {
        console.log(result)
        await api.post(`/gameFinish/show`, result)
            .then((res) => {
                console.log(res);
                // dispatch(getGameResult(res))
            })
    }
}


const gameOutDB=(gameNum )=>{
    return async function (dispatch, getState, { history }) {
        console.log("gameNum", gameNum);
        await api.delete(`/game/delete/${gameNum}`)
            .then(function (response) {
                console.log(response);
                history.push("/main");
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
        console.log("리듀서예요.")
    }),
    [GAMEEND]: (state, action) => produce(state, (draft) => {
        draft.result = action.payload.result
        console.log("리듀서예요.")
    })


},
    initialState
);

const actionCreators = {
    getGameDB,
    getGameResultDB,
    gameOutDB,
    gameResultDB
    
}

export { actionCreators };