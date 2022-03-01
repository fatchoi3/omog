import { createAction, handleActions } from "redux-actions";
import produce from 'immer';


// actions
const ORDER = "ORDER";


// action creators
const order = createAction(ORDER, (order) => ({ order }));


//initialState
const initialState = {
    order :"1"
};

//middleware actions


//reducer
export default handleActions({
    [ORDER]: (state, action) => 
      produce(state, (draft) => {
        if(action.payload.order==="1"){
            console.log("action1",action.payload.order)
            draft.order = "2";
        }else{
            console.log("action2",action.payload.order)
            draft.order = "1";
        }
       
       
    }),
},
initialState
);

const actionCreators = {
    order,
};

export { actionCreators };