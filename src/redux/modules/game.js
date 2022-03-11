import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";

// initialState
const initialState = {

}

// actions
const GETGAME = "GETGAME";
const GET_GAME_RESULT = "GET_GAME_RESULT";

// action creators
const getGame = createAction(GETGAME, (gameInfo) => ({ gameInfo }));
const getGameResult = createAction(GET_GAME_RESULT, (result) => ({ result }));

// middleware actions
const getGameDB = (gameNum) => {
    return async function (dispatch, getState, { history }) {
        await api.get(`/game/start/${gameNum}`)
            .then(function (response) {
                console.log(response);
                //dispatch(getGame(response));
            })
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


//reducer
export default handleActions({
    [GETGAME]: (state, action) => produce(state, (draft) => {
        draft.gameInfo = action.payload.gameInfo
        console.log("action.payload.gameInfo", action.payload.gameInfo)
    }),
    [GET_GAME_RESULT]: (state, action) => produce(state, (draft) => {
        console.log("리듀서예요.")
    })


},
    initialState
);

const actionCreators = {
    getGameDB,
    getGameResultDB,
}

export { actionCreators };