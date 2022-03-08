import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";

// initialState
const initialState = {
   
}

// actions
const GETGAME = "GETGAME";


// action creators
const getGame = createAction(GETGAME , (gameInfo) => ({gameInfo}));

// middleware actions
const getGameDB = (gameNum) =>{
    return async function ( dispatch, getState, { history }){
        await api.get( `/game/start/${gameNum}`)
        .then(function(response){
            console.log(response);
            //dispatch(getGame(response));
        })
    }
};


//reducer
export default handleActions({
    [GETGAME]: (state, action) => produce(state, (draft) => {
        draft.gameInfo = action.payload.gameInfo
        console.log("action.payload.gameInfo", action.payload.gameInfo)
    }),
    
    
    
},
    initialState
);

const actionCreators = {
    getGameDB,
    
}

export { actionCreators };