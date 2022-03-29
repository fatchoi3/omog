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
                <p className="waiting__roomnum">{roomNum}번 방</p>
                <p className="waiting__roomname">{roomName}</p>
            </WaitingHeader>
            <WaitPlayerList roomNum={roomNum} socket={socket} />
            <GameStartBtn socket={socket} roomNum={roomNum} />
            <WaitObserverList roomNum={roomNum} socket={socket} />
        </>
    );
}

const WaitingHeader = styled.div`
    width: 50%;
    height: auto;
    outline: 2px solid black;
    border-radius: 15px;
    margin: 0 auto 20px auto;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;

    > p:nth-child(1) {
        width: 50%;
        height: auto;
        margin: 0;
        padding: 10px 0;
        border-right: 2px solid black;
        font-size: 14px;
        font-weight: 700;
        line-height: 17px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #94D7BB;
    }

    > p:nth-child(2){
        width: 50%;
        height: auto;
        margin: 0;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 700;
        line-height: 17px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }
`

export default WaitingUsers;