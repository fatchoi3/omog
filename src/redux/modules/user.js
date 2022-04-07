import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import Swal from 'sweetalert2';

import api from "../../api/api";
import * as Sentry from "@sentry/react";

// initialState
const initialState = {
  userInfo: {
    id: 1,
    nickname: "",
    score: [{ win: 0 }, { lose: 0 }],
    point: 10000,
    profileImage: "",
  },
  list: [
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
  ],
  leader_list: [
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
  ],
  leader_board: [
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
    {
      id: 1,
      score: [{ win: 0 }, { lose: 0 }],
      point: 10000,
      state: "online",
    },
  ],
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
  },
  findPassCheck: false,
  signupCheck: false,
};

// actions
const LOGIN_CHECK = "LOGIN_CHECK";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
const GET_USER_INFO = "GET_USER_INFO";
const GET_LEADERS = "GET_LEADERS";
const GET_LEADER_BOARD = "GET_LEADER_BOARD";
const CLEAR_STATE = "CLEAR_STATE";
const FIND_PASS_CHECK = "FIND_PASS_CHECK";
const SIGNUP_PASS_CHECK = "SIGNUP_PASS_CHECK";

// action creators
const loginCheck = createAction(LOGIN_CHECK, (userInfo) => ({ userInfo }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const getUserInfo = createAction(GET_USER_INFO, (user_list) => ({ user_list }));
const getLeaders = createAction(GET_LEADERS, (leader_list) => ({
  leader_list,
}));
const getLeaderBorad = createAction(GET_LEADER_BOARD, (leader_board) => ({
  leader_board,
}));
const logout = createAction(LOG_OUT, (user) => ({ user }));
const clearOne = createAction(CLEAR_STATE);
const findPassCheck = createAction(FIND_PASS_CHECK, (bool) => ({ bool }));
const signupPassCheck = createAction(SIGNUP_PASS_CHECK, (bool) => ({ bool }));

// middleware actions
const signupDB = (id, email, password, passwordConfirm, pickIndex) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.post(
        "/signup",

        {
          id: id,
          email: email,
          pass: password,
          confirmPass: passwordConfirm,
          profileImage: pickIndex + 1,
        }
      );
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공',
        text: '회원가입에 성공했습니다. 로그인해주세요.',
      });
      dispatch(signupPassCheck(false));
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '회원가입 실패',
        text: `${error.response.data.errorMessage}`,
      });
      console.log(getState())
      Sentry.captureException(error);
    }
  };
};

const loginDB = (id, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.post("/login", { id: id, pass: password });
      console.log(res);
      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.id);
        history.push("/main");
        dispatch(loginCheckDB(id));
      }
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '로그인 실패',
        text: `${error.response.data.errorMessage}`,
      });
      Sentry.captureException(error);
    }
  };
};
const logoutDB = (id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.post("/lobby/logout", { id: id });
      console.log(res);
      if (res) {
        console.log("로그아웃이 되었어요", res);
        dispatch(logout(id));
      }
    } catch (error) {
      alert(`${error.response.data.errorMessage}`);
      Sentry.captureException(error);
    }
  };
};

const getUserDB = (id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.get(`/lobby/userList/${id}`);
      dispatch(getUserInfo(res.data));
    }
    catch (error) {
      Sentry.captureException(error);
    }
  };
};

const loginCheckDB = (id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.get(`/userinfo/${id}`);
      dispatch(loginCheck(res.data));
    } catch (error) {
      Sentry.captureException(error);
      console.log(error);
    }
  };
};

const getLeaderDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.get("/lobby/leaderList");
      dispatch(getLeaders(res.data));
    }
    catch (error) {
      Sentry.captureException(error);
    }
  };
};

const getLeaderBoardDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.get("/leaderBoard");
      dispatch(getLeaderBorad(res.data));
    }
    catch (error) {
      Sentry.captureException(error);
    }
  };
};

const passwordSearchDB = (id, email) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.post("/findpass", { id: id, email: email })
      dispatch(findPassCheck(res.data.ok));
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '아이디, 이메일 인증 실패',
        text: `${error.response.data.errorMessage}`,
      });
      Sentry.captureException(error);
    }
  }
}

const newPasswordDB = (id, email, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.post("/newPass", { id: id, email: email, newPass: password });
      console.log(res.data);
      dispatch(findPassCheck(false));
      history.replace('/');
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '패스워드 변경 실패',
        text: `${error.response.data.errorMessage}`,
      });
      Sentry.captureException(error);
    }
  };
}


//reducer
export default handleActions(
  {
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.name = action.payload.user;
        console.log("action.payload.user", action.payload.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        window.location.replace("/");
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
        console.log("action.payload.userInfo", action.payload.userInfo);
      }),
    [GET_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.user_list;
      }),
    [GET_LEADERS]: (state, action) =>
      produce(state, (draft) => {
        draft.leader_list = action.payload.leader_list;
      }),
    [GET_LEADER_BOARD]: (state, action) =>
      produce(state, (draft) => {
        draft.leader_board = action.payload.leader_board;
      }),
    [CLEAR_STATE]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = {};
      }),
    [FIND_PASS_CHECK]: (state, action) => produce(state, (draft) => {
      draft.findPassCheck = action.payload.bool;
    }),
    [SIGNUP_PASS_CHECK]: (state, action) => produce(state, (draft) => {
      console.log(action.payload.bool)
      draft.signupCheck = action.payload.bool;
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
  clearOne,
  logoutDB,
  passwordSearchDB,
  findPassCheck,
  newPasswordDB,
  signupPassCheck,
};

export { actionCreators };
