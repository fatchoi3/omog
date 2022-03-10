import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";

// initialState
const initialState = {
    list: [
        {
            roomName: 1,
            roomNum: 2,
            playerCnt: 1,
            observeCnt: 4,
            state: ""
        },
    ],

    roomInfo: {
        roomNum: 2,
        playerCnt: 2,
        observeCnt: 4
    },

    userInfo: [
        {
            id: 1,
            state: ""
        }
    ],

}

// actions
const GET_ROOM = "GET_ROOM";
const GET_ROOM_INFO = "GET_ROOM_INFO";
const JOIN_ROOM = "JOIN_ROOM";
const GET_WAITING = "GET_WAITING";
const GAME_START = "GAME_START";

// action creators
const getRoomList = createAction(GET_ROOM, (roomList) => ({ roomList }));
const getRoomInfo = createAction(GET_ROOM_INFO, (roomInfo) => ({ roomInfo }));
const joinRoom = createAction(JOIN_ROOM, (userInfo) => ({ userInfo }));
const getWaiting = createAction(GET_WAITING, (waitingInfo) => ({ waitingInfo }))

// middleware actions
const getRoomListDB = () => {
    return async function (dispatch, getState, { history }) {
        await api.get("/lobby")
            .then(function (response) {
                // console.log(response.data);
                dispatch(getRoomList(response.data));
            })
    }
};
const getRoomInfoDB = (roomNum) => {
    return async function (dispatch, getState, { history }) {
        console.log("roomNum", roomNum);
        await api.get(`/lobby/joinroom/${roomNum}`)
            .then(function (response) {
                console.log(response.data);
                dispatch(getRoomInfo(response.data));
            })
    }
};

const addRoomDB = () => {
    return async function (dispatch, useState, { history }) {
        const userId = localStorage.getItem('userId');
        const roomName = "너만 오면 ㄱ"
        await api.post("/lobby/create",
            {
                roomName: roomName,
                id: userId
            }

        )
            .then(function (response) {
                console.log("안녕 나는 미들웨어 add", response.data.roomNum)
                history.push(`/waiting/${response.data.roomNum}`)
            }).catch(error => {
                // window.alert("방생성 실패!");
                console.log(error)
            });
    }
};

const joinRoomDB = (room) => {
    return async function (dispatch, useState, { history }) {
        // const token = localStorage.getItem('token');
        await api.post("/lobby/joinroom", room)
            .then(function (response) {
                console.log("안녕 나는 미들웨어 join", response)
                dispatch(joinRoom(response.data));
                history.push(`/waiting/${room.roomNum}`)
            }).catch(error => {
                // window.alert("방참가 실패!");
                console.log(error)
            });
    }
};

const getWaitingInfoDB = (roomNum) => {
    return async function (dispatch, getState, { history }) {
        await api.get(`/room/waiting/${roomNum}`)
            .then(function (response) {
                console.log(response.data);
                dispatch(getWaiting(response.data));
            })
    }
};

// {
//     blackTeamPlayer:
//     blackTeamObserver:  [ a, b, c, d, f ] ,
//     whiteTeamPlayer:
//     whiteTeamObserver:  [ a, b, c, d, f ] ,
//     roomNum:
//     }

const gameStartDB = (blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNum) => {
    return async function (dispatch, getState, { history }) {
        // console.log(blackPlayer[0], whitePlayer[0], blackObserverList.map((i) => [...i.id])[0], whiteObserverList?.map((i) => [...i.id]))
        const roomNum = 2;
        const blackPlayer = "jong";
        const whitePlayer = "ji";
        const blackObserverList = ["a", "b", "c", "d"];
        const whiteObserverList = ["e", "f", "d", "w"];
        await api.post(`/game/create`, {
            blackTeamPlayer: blackPlayer,
            whiteTeamPlayer: whitePlayer,
            blackTeamObserver: blackObserverList,
            whiteTeamObserver: whiteObserverList,
            roomNum: roomNum,
        })
            .then((res) => {
                console.log(res);
                history.push(`/game/${roomNum}`)
            })
    }
}


//reducer
export default handleActions({
    [GET_ROOM]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.roomList
        // console.log("action.payload.roomList", action.payload.roomList)
    }),
    [GET_ROOM_INFO]: (state, action) => produce(state, (draft) => {
        draft.roomInfo = action.payload.roomInfo
        console.log("action.payload.roomInfo", action.payload.roomInfo)
    }),
    [JOIN_ROOM]: (state, action) => produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo
        console.log("action.payload.userInfo", action.payload.userInfo)
    }),
    [GET_WAITING]: (state, action) => produce(state, (draft) => {
        draft.waitingInfo = action.payload.waitingInfo
        console.log("action.payload.waitingInfo", action.payload.waitingInfo)
    }),


},
    initialState
);

const actionCreators = {
    getRoomListDB,
    getRoomInfoDB,
    addRoomDB,
    joinRoomDB,
    getWaitingInfoDB,
    gameStartDB,
}

export { actionCreators };