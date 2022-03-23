import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
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
        roomNum: "",
        playerCnt: 2,
        observeCnt: 4
    },

    userInfo: {
        id: 1,
        'nickname': '',
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 0,
        state: '',
    },

    blackObserverList: [],
    whiteObserverList: [],
    blackPlayer: {
        id: 1,
        'nickname': '',
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 0,
        state: '',
    },
    whitePlayer: {
        id: 1,
        'nickname': '',
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 0,
        state: '',
    },

}

// actions
const GET_ROOM = "GET_ROOM";
const GET_ROOM_INFO = "GET_ROOM_INFO";
const JOIN_ROOM = "JOIN_ROOM";
const SET_WAIT_USER = "SET_WAIT_USER";
const CHANGE_STATE = "CHANGE_STATE";
const RESET_STATE_USER = "RESET_STATE_USER";
const CHANGE_USERINFO = "CHANGE_USERINFO";



// action creators
const getRoomList = createAction(GET_ROOM, (roomList) => ({ roomList }));
const getRoomInfo = createAction(GET_ROOM_INFO, (roomInfo) => ({ roomInfo }));
const joinRoom = createAction(JOIN_ROOM, (userInfo, localId) => ({ userInfo, localId }));
const setWaitUser = createAction(SET_WAIT_USER, (id, users) => ({ id, users }));
const changeState = createAction(CHANGE_STATE, (id, users) => ({ id, users }));
const resetStateUser = createAction(RESET_STATE_USER, (user) => ({ user }));
const changeUserInfo = createAction(CHANGE_USERINFO, (id, someone, state) => ({ id, someone, state }));


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
    return function (dispatch, getState, { history }) {
        console.log("roomNum", roomNum);
        api.get(`/lobby/joinroom/${roomNum}`)
            .then(function (response) {
                // console.log(response.data);
                dispatch(getRoomInfo(response.data));
            })
    }
};



const addRoomDB = (roomName) => {
    return function (dispatch, useState, { history }) {
        const userId = localStorage.getItem('userId');
        api.post("/lobby/create",
            {
                roomName: roomName,
                id: userId
            }

        )
            .then(function (response) {
                console.log("안녕 나는 미들웨어 add", response.data)
                dispatch(joinRoom(response.data.userInfo))
                history.push(`/waiting/${response.data.roomNum}`)
            }).catch(error => {
                // window.alert("방생성 실패!");
                console.log(error)
            });
    }
};

const joinRoomDB = (room) => {
    return function (dispatch, useState, { history }) {
        // const token = localStorage.getItem('token');
        api.post("/lobby/joinroom", room)
            .then(function (response) {
                console.log("안녕 나는 미들웨어 join", response)
                dispatch(joinRoom(response.data, room.id));
                history.push(`/waiting/${room.roomNum}`)
            }).catch(error => {
                // window.alert("방참가 실패!");
                console.log(error)
            });
    }
};


const gameStartDB = (blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNum) => {
    return async function (dispatch, getState, { history }) {
        console.log(blackPlayer, whitePlayer, blackObserverList, whiteObserverList)
        try {
            const res = await api.post(`/game/create`, {
                blackTeamPlayer: blackPlayer?.id ? blackPlayer.id : null,
                whiteTeamPlayer: whitePlayer?.id ? whitePlayer.id : null,
                blackTeamObserver: blackObserverList,
                whiteTeamObserver: whiteObserverList,
                roomNum: roomNum,

            })
            console.log(res);
            console.log(roomNum);
            history.push(`/game/${roomNum}`)
        } catch (error) {
            console.log(error)
        }
    }
};
const quickStartPlayer = (id) => {
    return function (dispatch, getState, { history }) {
        console.log("id", id);
        api.get(`/lobby/fastPlayer/${id}`)
            .then(function (response) {
                console.log("response", response.data);
                dispatch(joinRoom(response.data.userInfo, id));
                history.push(`/waiting/${response.data.roomNum}`)
            }).catch(error => {
                alert("방이 없습니다!")
                console.log(error.message)
            });
    }
};
const quickStartObserver = (id) => {
    return function (dispatch, getState, { history }) {
        console.log("id", id);
        api.get(`/lobby/fastObserver/${id}`)
            .then(function (response) {
                console.log("response", response.data.roomNum);
                history.push(`/waiting/${response.data.roomNum}`)
            }).catch(error => {
                alert("방이 없습니다!")
                console.log(error)
            });
    }
};

const numJoinDB = (data) => {
    console.log(data)
    return  function (dispatch, useState, { history }) {
        api.post("/lobby/roomNumJoin", data)
            .then(function (response) {
                console.log("안녕 나는 Numjoin", response.data.roomNum);
                history.push(`/waiting/${response.data.roomNum}`)
            }).catch(error => {
                // window.alert("방참가 실패!");
                console.log(error.message)
            });
    }
};

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
        draft.userInfo = action.payload.userInfo;
        console.log("방입장 action.payload.userInfo", action.payload.userInfo)
    }),
    [SET_WAIT_USER]: (state, action) => produce(state, (draft) => {
        console.log("리듀서까지 왔습니다", action.payload.users[0]);
        draft.blackPlayer = action.payload.users[0].blackPlayerInfo[0];
        draft.whitePlayer = action.payload.users[0].whitePlayerInfo[0];
        draft.blackObserverList = [...action.payload.users[0].blackTeamObserver];
        draft.whiteObserverList = [...action.payload.users[0].whiteTeamObserver];
    }),
    [CHANGE_STATE]: (state, action) => produce(state, (draft) => {
        console.log(action.payload.id);
        console.log(action.payload.users);
        draft.blackPlayer = action.payload.users[0].blackPlayerInfo[0];
        draft.whitePlayer = action.payload.users[0].whitePlayerInfo[0];
        draft.blackObserverList = [...action.payload.users[0].blackTeamObserver];
        draft.whiteObserverList = [...action.payload.users[0].whiteTeamObserver];
    }),
    [RESET_STATE_USER]: (state, action) => produce(state, (draft) => {
        draft.blackObserverList = [];
        draft.whiteObserverList = [];
        draft.blackPlayer = {};
        draft.whitePlayer = {};
    }),
    [CHANGE_USERINFO]: (state, action) => produce(state, (draft) => {
        console.log(action.payload.id, action.payload.someone)
        if (action.payload.id === action.payload.someone) {
            console.log("같으니까 변경!")
            draft.userInfo = { ...draft.userInfo, state: action.payload.state }
        }
    }),
},
    initialState
);

const actionCreators = {
    getRoomListDB,
    getRoomInfoDB,
    addRoomDB,
    joinRoomDB,
    gameStartDB,
    setWaitUser,
    changeState,
    resetStateUser,
    quickStartPlayer,
    quickStartObserver,
    changeUserInfo,
    numJoinDB
}

export { actionCreators };