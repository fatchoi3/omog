import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../redux/configureStore';

import { actionCreators as roomActions } from '../../redux/modules/room';
import { Button, Text } from '../../elements';


function GameStartBtn({ socket, roomNum }) {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId");

    const waitingPerson = useSelector((state) => state.room.userInfo);
    const blackPlayer = useSelector(state => state.room.blackPlayer);
    const whitePlayer = useSelector(state => state.room.whitePlayer);
    const blackObserverList = useSelector(state => state.room.blackObserverList);
    const whiteObserverList = useSelector(state => state.room.whiteObserverList);

    const [start, setStart] = useState(false);

    const gameStart = (e) => {
        if (blackPlayer?.hasOwnProperty('id') && whitePlayer?.hasOwnProperty('id')) {
            console.log("게임 실행")
            e.preventDefault();
            const roomNumber = roomNum;
            socket.emit("gameStart", roomNumber);
            dispatch(roomActions.gameStartDB(blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNumber));
            setStart(true);
        }
    }

    useEffect(() => {
        const gameStartF = (roomNum) => {
            history.push(`/game/${roomNum}`)
        }

        socket.on("game", gameStartF);

        return () => {
            socket.off("game", gameStartF);
        }
    }, [start])

    return (
        <div style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
            {waitingPerson &&
                waitingPerson.id === userId && waitingPerson.state === "blackPlayer"
                ?
                <Button
                    is_width="30%"
                    is_padding="18px 36px"
                    is_radius="14px"
                    is_background="#94D7BB"
                    is_center="center"
                    is_margin="20px"
                    is_border="2px solid black"
                    is_cursor="pointer"
                    is_hover="inset 0 -5em 0 0 #6DB6DF, inset 0 5em 0 0 #6DB6DF"
                    _onClick={gameStart}
                ><Text is_bold="800" is_size="24px" is_line_height="28px">게임 시작</Text></Button>
                :
                <Button
                    is_width="30%"
                    is_padding="18px 36px"
                    is_radius="14px"
                    is_background="#94D7BB"
                    is_center="center"
                    is_margin="20px"
                    is_border="2px solid black"
                    is_cursor="pointer"
                    _onClick={gameStart}
                    disabled
                ><Text is_bold="800" is_size="24px" is_line_height="28px">
                        게임 시작
                    </Text>
                </Button>
            }
        </div>
    );
}


export default React.memo(GameStartBtn);