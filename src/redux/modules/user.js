import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import api from "../../api/api";

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
  findPassCheck: false
  ,
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
const findPassCheck = createAction(FIND_PASS_CHECK, (boo) => ({ boo }));

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
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
    } catch (error) {
      alert(`${error.response.data.errorMessage}`);
    }
  };
};

const loginDB = (id, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.post("/login", { id: id, pass: password });
      console.log(res);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.id);
        history.push("/main");
        console.log("로그인이 되었어요");
        dispatch(loginCheckDB(id));
      }
    } catch (error) {
      alert(`${error.response.data.errorMessage}`);
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
    }
  };
};

const getUserDB = (id) => {
  return function (dispatch, getState, { history }) {
    api.get(`/lobby/userList/${id}`).then(function (response) {
      console.log(response.data);
      dispatch(getUserInfo(response.data));
    });
  };
};

const loginCheckDB = (id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.get(`/userinfo/${id}`);
      dispatch(loginCheck(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const getLeaderDB = () => {
  return function (dispatch, getState, { history }) {
    api.get("/lobby/leaderList").then(function (response) {
      console.log(response.data);
      dispatch(getLeaders(response.data));
    });
  };
};

const getLeaderBoardDB = () => {
  return function (dispatch, getState, { history }) {
    api.get("/leaderBoard").then(function (response) {
      console.log(response.data);
      dispatch(getLeaderBorad(response.data));
    });
  };
};

const passwordSearchDB = (id, email) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.post("/findpass", { id: id, email: email })
      dispatch(findPassCheck(res.data.ok));
    } catch (error) {
      alert(`${error.response.data.errorMessage}`);
    }
  }
}

const newPasswordDB = (id, email, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await api.post("/newPass", { id: id, email: email, newPass: password });
      console.log(res.data);
      alert("비밀번호가 변경되었습니다.");
      dispatch(findPassCheck(false));
      history.replace('/');
    } catch (error) {
      console.log(error);
      alert(`${error.response.data.errorMessage}`);
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
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
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
      draft.findPassCheck = action.payload.boo;
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
  getUserDB,
  getLeaderDB,
  getLeaderBoardDB,
  clearOne,
  logoutDB,
  passwordSearchDB,
  findPassCheck,
  newPasswordDB,
};

export { actionCreators };
