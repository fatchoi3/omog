import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import Logo from '../../pictures/omokjomok.svg'

import { actionCreators as roomActions } from '../../redux/modules/room';
import { Button, Text } from '../../elements';

import WaitPlayerList from './WaitPlayerList';
import WaitObserverList from './WaitObserverList';


function WaitingUsers({ socket, roomNum }) {
    console.log("대기방 유저 컴포넌트입니다. 몇 번 렌더링될까요?")
    const dispatch = useDispatch();

    const userId = localStorage.getItem("userId");
    const waitingPerson = useSelector((state) => state.room.userInfo);
    console.log(waitingPerson);

    const [blackPlayer, setBlackPlayer] = useState({});
    const [whitePlayer, setWhitePlayer] = useState({});
    const [blackObserverList, setBlackObserverList] = useState([]);
    const [whiteObserverList, setWhiteObserverList] = useState([]);
    const [start, setStart] = useState(false);


    console.log(blackPlayer, whitePlayer, blackObserverList, whiteObserverList);

    const gameStart = (e) => {
        console.log("게임 실행")
        e.preventDefault();
        const roomNumber = roomNum;
        socket.emit("gameStart", roomNumber);
        setStart(true);
    }


    useEffect(() => {
        // socket에 닉네임 보내기
        socket.emit("nickname", userId);
        console.log(userId, ": 닉네임을 보냈습니다.");

        // socket에 입장 정보 보내기
        if (waitingPerson.state === "blackPlayer" || waitingPerson.state === "whitePlayer") {
            socket.emit("enterRoomPlayer", roomNum, waitingPerson.state);
            console.log(`enterRoomBlackPlayer 입장, 방번호 : ${roomNum}, ${waitingPerson.state}`);
        } else {
            socket.emit("enterRoomObserver", roomNum, waitingPerson.state);
            console.log(`enterRoomWhiteObserver 입장, 방번호 : ${roomNum}, ${waitingPerson.state}`)
        }

        // 대기방 접속한 인원 정보 받기
        const welcome = (id, userInfos) => {
            console.log("welcome 실행완료", id, userInfos);
            setBlackPlayer(userInfos[0].blackPlayerInfo[0]);
            setWhitePlayer(userInfos[0].whitePlayerInfo[0]);
            setBlackObserverList([...userInfos[0].blackTeamObserver]);
            setWhiteObserverList([...userInfos[0].whiteTeamObserver]);
        }

        socket.on("welcome", welcome)

        const changeState = (id, userInfos) => {
            console.log("state 변경이 되나요?", id, userInfos);
            setBlackPlayer(userInfos[0].blackPlayerInfo[0]);
            setWhitePlayer(userInfos[0].whitePlayerInfo[0]);
            setBlackObserverList([...userInfos[0].blackTeamObserver]);
            setWhiteObserverList([...userInfos[0].whiteTeamObserver]);
            dispatch(roomActions.changeState(id, userInfos));
        }

        socket.on("changeComplete", changeState);

        return () => {
            socket.off("changeComplete", changeState);
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        const gameStartF = (roomNumber) => {
            dispatch(roomActions.gameStartDB(blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNumber));
        }

        socket.on("game", gameStartF);

        return () => {
            socket.off("game", gameStartF);
        }
    }, [start])


    return (
        <>
            <div style={{ width: "7rem", height: "76px" }}>
                <img src={Logo} alt="로고" style={{ width: "100%", height: "100%", background: "#C4C4C4" }} />
            </div>
            <WaitPlayerList socket={socket} blackPlayer={blackPlayer} whitePlayer={whitePlayer} />

            <div style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
                {
                    waitingPerson.state === "blackPlayer"
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
            <WaitObserverList socket={socket} blackObserverList={blackObserverList} whiteObserverList={whiteObserverList} />
        </>
    );
}

export default React.memo(WaitingUsers);