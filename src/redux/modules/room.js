import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";

// initialState
const initialState = {
    nickname: null,
}

// actions
const GET_ROOM = "GET_ROOM";
const GET_ROOM_INFO = "GET_ROOM_INFO";
const JOIN_ROOM = "JOIN_ROOM";
const GET_WAITING="GET_WAITING";

// action creators
const getRoomList = createAction(GET_ROOM , (roomList) => ({roomList}));
const getRoomInfo = createAction(GET_ROOM_INFO, (roomInfo)=>({roomInfo}));
const joinRoom = createAction(JOIN_ROOM, (userInfo)=>({userInfo}));
const getWaiting= createAction(GET_WAITING,(waitingInfo)=>({waitingInfo}))

// middleware actions
const getRoomListDB = () =>{
    return async function ( dispatch, getState, { history }){
        await axios.get( "/lobby")
        .then(function(response){
            console.log(response);
            dispatch(getRoomList(response));
        })
    }
};
const getRoomInfoDB = (roomNum) =>{
    return async function ( dispatch, getState, { history }){
        await axios.get( `/lobby/joinroom/${roomNum}`)
        .then(function(response){
            console.log(response);
            dispatch(getRoomInfo(response));
        })
    }
};

const addRoomDB = (room ) => {
    return async function (dispatch, useState, { history }) {
        // const token = localStorage.getItem('token');
        await api.post("/lobby/create",room)
            .then(function (response) {
                console.log("안녕 나는 미들웨어 add",response)
                // history.push('/room/waiting/:roomNum')
              }).catch(error => {
                // window.alert("방생성 실패!");
                console.log(error)
            });
    }
};

const joinRoomDB = (room ) => {
    return async function (dispatch, useState, { history }) {
        // const token = localStorage.getItem('token');
        await api.post("/lobby/joinroom",room)
            .then(function (response) {
                console.log("안녕 나는 미들웨어 join",response)
                // history.push('/room/waiting/:roomNum')
                dispatch(joinRoom(response));
              }).catch(error => {
                // window.alert("방참가 실패!");
                console.log(error)
            });
    }
};

const getWaitingInfoDB = (roomNum) =>{
    return async function ( dispatch, getState, { history }){
        await api.get( `/room/waiting/${roomNum}`)
        .then(function(response){
            console.log(response);
            dispatch(getWaiting(response));
        })
    }
};


//reducer
export default handleActions({
    [GET_ROOM]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.roomlist
        console.log("action.payload.roomlist", action.payload.roomlist)
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
}

export { actionCreators };