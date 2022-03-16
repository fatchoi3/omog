import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../../redux/modules/room';


function GameStartBtn({ socket, blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNum }) {
    const dispatch = useDispatch();
    const [start, setStart] = useState(false);

    const gameStart = (e) => {
        console.log("게임 시작 버튼입니다.", start)
        e.preventDefault();
        const roomNumber = roomNum
        socket.emit("gameStart", roomNumber);
        // socket.on("game", roomNum => {
        //     console.log("왜 안되냐고~")
        // })
        setStart(true);
    }

    useEffect(() => {
        console.log("되는건가요?")
        socket.on("game", (roomNumber) => {
            console.log("여기라도 되라고~")
            dispatch(roomActions.gameStartDB(blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNumber));
        })
    }, [start])


    return (
        <div>
            <button onClick={gameStart}> 게임 시작 </button>
        </div>
    );
}

export default GameStartBtn;