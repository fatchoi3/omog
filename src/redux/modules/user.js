import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";


// initialState
const initialState = {
    nickname: null,
}

// actions
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
const GET_USER_INFO = "GET_USER_INFO";
const GET_LEADERS = "GET_LEADERS";
const GET_LEADER_BOARD = "GET_LEADER_BOARD";

// action creators
const getUser = createAction(GET_USER, (user) => ({ user }));
const getUserInfo = createAction((GET_USER_INFO), (user_list) => ({user_list }));
const getLeaders = createAction((GET_LEADERS), (leader_list)=>({leader_list}))
const getLeaderBorad = createAction((GET_LEADER_BOARD), (leader_board)=>({leader_board}))
const logout = createAction((LOG_OUT), (user) => ({ user }));


// middleware actions
const signupDB = (id, password, passwordConfirm) => {
    return async function (dispatch, getState, { history }) {
        await axios
            .post("/signup",
                {
                    id: id,
                    pass: password,
                    confirmPass: passwordConfirm
                }
            )
            .then(function (response) {
                console.log(response)
            })
            .catch((err) => {
                console.log(err.ok);
                if (err.ok === false) {
                    window.alert(`${err.errorMessage}`);
                }
            });
    };
};


const loginDB = (id, password) => {
    return async function (dispatch, getState, { history }) {
        await axios.post("/login", { id: id, pass: password })
            .then(function (response) {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    history.push('/')
                    window.location.replace("/")

                    console.log("로그인이 되었어요")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

const getUserDB = () =>{
    return async function ( dispatch, getState, { history }){
        await axios.get( "/lobby/userList")
        .then(function(response){
            console.log(response);
            //dispatch(getUserInfo(response));
        })
    }
};

const getLeaderDB = () =>{
    return async function ( dispatch, getState, { history }){
        await axios.get( "/lobby/leaderList")
        .then(function(response){
            console.log(response);
            //dispatch(getLeaderBorad(response));
        })
    }
};

const getLeaderBoardDB = () =>{
    return async function ( dispatch, getState, { history }){
        await axios.get( "leaderBoard")
        .then(function(response){
            console.log(response);
            //dispatch(getLeaderBorad(response));
        })
    }
};

//reducer
export default handleActions({
    [GET_USER]: (state, action) => produce(state, (draft) => {
        draft.name = action.payload.user
        console.log("action.payload.user", action.payload.user)
    }),
    [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            localStorage.removeItem("token")
            window.location.replace("/login")
            console.log("로그아웃합니다")
    }),
    [GET_USER_INFO]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.user_list;
        //console.log("draft.list",draft.list)
    }),
    [GET_LEADERS]: (state, action) => produce(state, (draft) => {
        draft.leader_list = action.payload.leader_list;
        //console.log("draft.list",draft.list)
    }),
    [GET_LEADER_BOARD]: (state, action) => produce(state, (draft) => {
        draft.leader_board = action.payload.leader_board;
        //console.log("draft.list",draft.list)
    }),
},
    initialState
);

const actionCreators = {
    signupDB,
    loginDB,
    getUser,
    logout,
    getUserDB,
    getLeaderDB,
    getLeaderBoardDB,
}

export { actionCreators };