import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../../redux/modules/room';

import { Button, Text } from '../../elements';


function GameStartBtn({ socket, blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNum }) {
    const dispatch = useDispatch();
    const [start, setStart] = useState(false);

    const gameStart = (e) => {
        e.preventDefault();
        const roomNumber = roomNum
        socket.emit("gameStart", roomNumber);
        setStart(true);
    }

    useEffect(() => {
        socket.on("game", (roomNumber) => {
            dispatch(roomActions.gameStartDB(blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNumber));
        })
    }, [start])


    return (
        <div style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
            <Button
                is_width="30%"
                is_padding="18px 36px"
                is_radius="14px"
                is_background="#94D7BB"
                is_center="center"
                is_margin="20px"
                is_border="none"
                is_cursor="pointer"
                _onClick={gameStart}
            >
                <Text is_bold="800" is_size="24px" is_line_height="28px">게임 시작</Text>
            </Button>
        </div>
    );
}

export default GameStartBtn;