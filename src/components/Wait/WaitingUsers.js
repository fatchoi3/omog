import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../../redux/modules/room';

import WaitPlayerList from './WaitPlayerList';
import WaitObserverList from './WaitObserverList';
import GameStartBtn from './GameStartBtn';
import { Text } from '../../elements';


function WaitingUsers({ socket, roomNum }) {
    console.log("대기방 유저 컴포넌트입니다. 몇 번 렌더링될까요?")
    const dispatch = useDispatch();

    const userId = localStorage.getItem("userId");
    const waitingPerson = useSelector((state) => state.room.userInfo);
    const roomName = useSelector((state) => state.room.roomName);
    console.log(waitingPerson);


    useEffect(() => {
        // socket에 닉네임 보내기
        const nickname = {
            id: userId,
            roomNum: roomNum
        };
        socket.emit("nickname", nickname);
        console.log(nickname, ": 닉네임을 보냈습니다.");

        // socket에 입장 정보 보내기
        if (waitingPerson.state === "blackPlayer" || waitingPerson.state === "whitePlayer") {
            const data = { roomNum: roomNum, state: waitingPerson.state }
            socket.emit("enterRoomPlayer", data);
            console.log(`enterRoomBlackPlayer 입장, 방번호 : ${roomNum}, ${waitingPerson.state}`);
        } else {
            const data = { roomNum: roomNum, state: waitingPerson.state }
            socket.emit("enterRoomObserver", data);
            console.log(`enterRoomWhiteObserver 입장, 방번호 : ${roomNum}, ${waitingPerson.state}`)
        }

        // 사용자 팀 및 상태 변경
        const changeState = (id, userInfos) => {
            console.log("state 변경이 되나요?", id, userInfos);
            dispatch(roomActions.changeState(id, userInfos));
        }
        socket.on("changeComplete", changeState);

        return () => {
            socket.off("changeComplete", changeState);
            socket.disconnect();
        }
    }, [])


    return (
        <>
            <WaitingHeader>
                <Text is_size="24px" is_margin="10px 0" is_bold="700">방 번호 : {roomNum}</Text>
                <Text is_size="24px" is_margin="10px 0" is_bold="700">방 제목 : {roomName}</Text>
            </WaitingHeader>
            <WaitPlayerList roomNum={roomNum} socket={socket} />
            <GameStartBtn socket={socket} roomNum={roomNum} />
            <WaitObserverList roomNum={roomNum} socket={socket} />
        </>
    );
}

const WaitingHeader = styled.div`
    width: 100%;
    height: auto;
    outline: 2px solid black;
    padding: 5px;
    border-radius: 10px;
    margin: 0 0 12px 0;
    display: flex;
    justify-content: space-around;
`

export default WaitingUsers;