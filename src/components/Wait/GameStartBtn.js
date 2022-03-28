import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Text } from '../../elements';

import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../redux/configureStore';
import { actionCreators as roomActions } from '../../redux/modules/room';


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
        <GameStart>
            {waitingPerson &&
                waitingPerson.id === userId && waitingPerson.state === "blackPlayer"
                ?
                <button className="gamestart__btn btn-animated btn-white" onClick={gameStart}>
                    <Text is_bold="800" is_size="24px" is_line_height="28px">게임 시작</Text>
                </button>
                :
                <button className="btn-disabled" onClick={gameStart} disabled>
                    <Text is_bold="800" is_size="24px" is_line_height="28px">
                        게임 시작
                    </Text>
                </button>
            }
        </GameStart>
    );
}

const GameStart = styled.div`
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    .gamestart__btn {
        width: 30%;
        padding: 18px 36px;
        margin: 20px;
        border: 2px solid black;
        border-radius: 14px;
        background-color: #94D7BB;
        text-align: center;
        cursor: pointer;
        transition: all .2s;

        &:link,
        &:visited {
            text-transform: uppercase;
            text-decoration: none;
            padding: 15px 40px;
            display: inline-block;
            border-radius: 100px;
            transition: all .2s;
            position: absolute;
        }

        &:hover {
            /* box-shadow: */
                /* inset 0 -5em 0 0 #6DB6DF,
                inset 0 5em 0 0 #6DB6DF; */
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        &:active {
            transform: translateY(-1px);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }

        &::after {
            content: "";
            display: inline-block;
            height: 100%;
            width: 100%;
            border-radius: 100px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            transition: all .4s;
        }

        &::after {
            background-color: #6DB6DF;
        }
        
        &:hover::after {
            transform: scaleX(1.4) scaleY(1.6);
            opacity: 0;
        }

        .btn-animated {
            animation: moveInBottom 5s ease-out;
            animation-fill-mode: backwards;
        }

        @keyframes moveInBottom {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }

            100% {
                opacity: 1;
                transform: translateY(0px);
            }
        }
    }

    .btn-disabled {
        width: 30%;
        padding: 18px 36px;
        margin: 20px;
        border: 2px solid black;
        border-radius: 14px;
        background-color: #94D7BB;
        text-align: center;
    }
`



export default React.memo(GameStartBtn);