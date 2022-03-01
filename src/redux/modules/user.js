import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';


// initialState
const initialState = {
    nickname: null,
}

// actions
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT"


// action creators
const getUser = createAction(GET_USER, (user) => ({ user }));
const logout = createAction((LOG_OUT), (user) => ({ user }));


// middleware actions
const signupDB = (id, password, passwordConfirm, nickname) => {
    return async function (dispatch, getState, { history }) {
        // const userInfo = {
        //     loginId: id,
        //     pass: password,
        //     confirmPass: passwordConfirm,
        //     nickname: nickname,
        // };
        await axios
            .post("/signup",
                {
                    id: id,
                    nickname: nickname,
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
                window.alert("회원가입에 실패했어요😥");
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
}


//reducer
export default handleActions({
    [GET_USER]: (state, action) => produce(state, (draft) => {
        draft.name = action.payload.user
        console.log("action.payload.user", action.payload.user)
    }),
    [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            localStorage.removeItem("name")
            localStorage.removeItem("token")
            window.location.replace("/")
            console.log("로그아웃합니다")
        }),
},
    initialState
);

const actionCreators = {
    signupDB,
    getUser,
    logout,
}

export { actionCreators };