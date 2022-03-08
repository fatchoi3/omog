import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';


// initialState
const initialState = {
    userInfo: {
        'id': '',
        'nickname': '',
        'score': 0,
        'point': 0,
    }
}

// actions
const LOGIN_CHECK = "LOGIN_CHECK";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";


// action creators
const loginCheck = createAction(LOGIN_CHECK, (userInfo) => ({ userInfo }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logout = createAction((LOG_OUT), (user) => ({ user }));


// middleware actions
const signupDB = (id, nickname, password, passwordConfirm) => {
    return async function (dispatch, getState, { history }) {
        console.log(id, nickname, password, passwordConfirm)
        await axios
            .post("http://15.164.103.116/signup",
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
                console.log(err.ok);
                if (err.ok === false) {
                    window.alert(`${err.errorMessage}`);
                }
            });
    };
};


const loginDB = (id, password) => {
    return async function (dispatch, getState, { history }) {
        await axios.post("http://15.164.103.116/login", { id: id, pass: password })
            .then(function (response) {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    history.push('/main')
                    console.log("로그인이 되었어요")
                    dispatch(loginCheckDB(id))
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

const loginCheckDB = (id) => {
    return async function (dispatch, getState, { history }) {
        await axios.get(`http://15.164.103.116/userinfo/${id}`)
            .then((res) => {
                dispatch(loginCheck(res.userInfo))
            })
    }
}


//reducer
export default handleActions({
    [GET_USER]: (state, action) => produce(state, (draft) => {
        draft.name = action.payload.user;
        console.log("action.payload.user", action.payload.user)
    }),
    [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            localStorage.removeItem("token")
            window.location.replace("/login")
            console.log("로그아웃합니다")
        }),
    [LOGIN_CHECK]: (state, action) => produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
    })
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
}

export { actionCreators };