import { createAction, handleActions } from "redux-actions";
import produce from 'immer';
import axios from 'axios';


// actions
const GET_WAITING_INFO = "GET_WAITING_INFO";


// action creators
const getWaitingInfo = createAction(GET_WAITING_INFO, (info) => ({ info }));


//initialState
const initialState = {
    info: {},
};

//middleware actions
const getWaitingInfoDB = (roomNum) => {
    return async function (dispatch, getState, { history }) {
        await axios.get("/room/waiting/:roomNum")
            .then((res) => {
                console.log(res)
                dispatch(getWaitingInfo(res))
            })
    }
}

//reducer
export default handleActions({
    [GET_WAITING_INFO]: (state, action) => produce(state, (draft) => {
        draft.info = action.payload.info;
    })
},
    initialState
);

const actionCreators = {
    getWaitingInfo,
    getWaitingInfoDB,
};

export { actionCreators };