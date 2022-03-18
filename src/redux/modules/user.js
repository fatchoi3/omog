import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";


// initialState
const initialState = {
    userInfo: {
        id: 1,
        'nickname': '',
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
    },
    list: [{
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }, {
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }, {
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }],
    leader_list: [{
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }, {
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }, {
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }],
    leader_board: [{
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }, {
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }, {
        id: 1,
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 10000,
        state: "online"
    }],
    blackPlayerInfo: {
        id: "초기값2",
        score: [3, 2],
        point: 1000,
        state: "blackPlayer",
    },
    whitePlayerInfo: {
        id: "초기값1",
        score: [2, 3],
        point: 1000,
        state: "whitePlayer",
    }
}

// actions
const LOGIN_CHECK = "LOGIN_CHECK";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
const GET_USER_INFO = "GET_USER_INFO";
const GET_LEADERS = "GET_LEADERS";
const GET_LEADER_BOARD = "GET_LEADER_BOARD";
const WHITE_PLAYER = "WHITE_PLAYER";
const BLACK_PLAYER = "BLACK_PLAYER";

// action creators
const loginCheck = createAction(LOGIN_CHECK, (userInfo) => ({ userInfo }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const getUserInfo = createAction((GET_USER_INFO), (user_list) => ({ user_list }));
const getLeaders = createAction((GET_LEADERS), (leader_list) => ({ leader_list }))
const getLeaderBorad = createAction((GET_LEADER_BOARD), (leader_board) => ({ leader_board }))
const logout = createAction((LOG_OUT), (user) => ({ user }));
const whiteCheck = createAction(WHITE_PLAYER, (whitePlayerInfo) => ({ whitePlayerInfo }));
const blackCheck = createAction(BLACK_PLAYER, (blackPlayerInfo) => ({ blackPlayerInfo }));

// middleware actions
const signupDB = (id, nickname, password, passwordConfirm) => {
    return async function (dispatch, getState, { history }) {
        await api
            .post("/signup",
                {
                    id: id,
                    pass: password,
                    nickname: nickname,
                    confirmPass: passwordConfirm
                }
            )
            .then(function (response) {
                console.log(response)
            })
            .catch((err) => {
                console.log(err);
                if (err.ok === false) {
                    window.alert(`${err.errorMessage}`);
                }
            });
    };
};


const loginDB = (id, password) => {
    return async function (dispatch, getState, { history }) {
        await api.post("/login", { id: id, pass: password })
            .then(function (response) {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.id);
                    history.push('/main')
                    console.log("로그인이 되었어요")
                    dispatch(loginCheckDB(id))
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

const getUserDB = () => {
    return async function (dispatch, getState, { history }) {
        await api.get("/lobby/userList")
            .then(function (response) {
                // console.log(response.data);
                dispatch(getUserInfo(response.data));
            })
    }
};


const loginCheckDB = (id) => {
    return async function (dispatch, getState, { history }) {

        await api.get(`/userinfo/${id}`)
            .then((res) => {
                // console.log("loginCheckDB", res.data)
                dispatch(loginCheck(res.data))
            })
    }
};

const getLeaderDB = () => {
    return async function (dispatch, getState, { history }) {
        await api.get("/lobby/leaderList")
            .then(function (response) {
                // console.log(response.data);
                dispatch(getLeaders(response.data));
            })
    }
};

const getLeaderBoardDB = () => {
    return async function (dispatch, getState, { history }) {
        await api.get("/leaderBoard")
            .then(function (response) {
                // console.log(response.data);
                dispatch(getLeaderBorad(response.data));
            })
    }
};
const whitePlayerCheck = (id) => {
    return async function (dispatch, getState, { history }) {
        await axios.get(`http://15.165.158.25/userinfo/${id}`)
            .then((res) => {

                dispatch(whiteCheck(res.data))
            })
    }
};
const blackPlayerCheck = (id) => {
    return async function (dispatch, getState, { history }) {
        await axios.get(`http://15.165.158.25/userinfo/${id}`)
            .then((res) => {

                dispatch(blackCheck(res.data))
            })
    }
};
//reducer
export default handleActions({
    [GET_USER]: (state, action) => produce(state, (draft) => {
        draft.name = action.payload.user;
        console.log("action.payload.user", action.payload.user)
    }),
    [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.replace("/")

        }),
    [LOGIN_CHECK]: (state, action) => produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
    }),
    [GET_USER_INFO]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.user_list;

    }),
    [GET_LEADERS]: (state, action) => produce(state, (draft) => {
        draft.leader_list = action.payload.leader_list;

    }),
    [GET_LEADER_BOARD]: (state, action) => produce(state, (draft) => {
        draft.leader_board = action.payload.leader_board;

    }),
    [WHITE_PLAYER]: (state, action) => produce(state, (draft) => {
        draft.whitePlayerInfo = action.payload.whitePlayerInfo;

    }),
    [BLACK_PLAYER]: (state, action) => produce(state, (draft) => {
        draft.blackPlayerInfo = action.payload.blackPlayerInfo;

    }),
},
    initialState
);

const actionCreators = {
    signupDB,
    loginDB,
    getUser,
    logout,
    loginCheckDB,
    loginCheck,
    getUserDB,
    getLeaderDB,
    getLeaderBoardDB,
    whitePlayerCheck,
    blackPlayerCheck
}

export { actionCreators };