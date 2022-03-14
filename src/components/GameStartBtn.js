import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actionCreators as roomActions } from '../redux/modules/room';


function GameStartBtn(props) {
    const dispatch = useDispatch();

    const get_user = useSelector((state) => state.room.user);
    const blackPlayer = useSelector((state) => state.room.blackPlayer);
    const whitePlayer = useSelector((state) => state.room.whitePlayer);
    const blackObserverList = useSelector((state) => state.room.blackObserverList);
    const whiteObserverList = useSelector((state) => state.room.whiteObserverList);

    const gameStart = () => {
        // if (blackPlayer.length > 0 && whitePlayer.length > 0) {
        dispatch(roomActions.gameStartDB(blackPlayer, whitePlayer, blackObserverList, whiteObserverList))
        // }
    }
    return (
        <button onClick={gameStart}> 게임 시작 </button>
    );
}

export default GameStartBtn;