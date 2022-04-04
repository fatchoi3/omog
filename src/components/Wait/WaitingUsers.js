import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../../redux/modules/room';

import WaitPlayerList from './WaitPlayerList';
import WaitObserverList from './WaitObserverList';
import GameStartBtn from './GameStartBtn';


function WaitingUsers({ socket, roomNum }) {
    console.log("대기방 유저 컴포넌트입니다. 몇 번 렌더링될까요?")
    const dispatch = useDispatch();

    const userId = sessionStorage.getItem("userId");
    const waitingPerson = useSelector((state) => state.room.userInfo);
    console.log(waitingPerson);
    const roomName = useSelector((state) => state.room.roomName);
    const blackPlayer = useSelector(state => state.room.blackPlayer);
    const whitePlayer = useSelector(state => state.room.whitePlayer);
    const [playerNum, setPlayerNum] = useState(0);

    useEffect(() => {
        if (blackPlayer?.hasOwnProperty('id') && whitePlayer?.hasOwnProperty('id')) {
            setPlayerNum(2);
        } else if (blackPlayer?.hasOwnProperty('id') || whitePlayer?.hasOwnProperty('id')) {
            setPlayerNum(1)
        } else {
            return setPlayerNum(0);
        }
    }, [blackPlayer, whitePlayer])


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
                <p className="waiting__player__number">플레이어 {playerNum}/2</p>
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

    >p {
        width: 50%;
        height: auto;
        margin: 0;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 700;
        line-height: 16.8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    > p:nth-child(1) {
        background-color: #94D7BB;
    }

    > p:nth-child(2){
        border-right: 2px solid black;
        border-left: 2px solid black;
        background-color: #fff;
    }

    >p:nth-child(3){
        background-color: #B1B1B1;
    }
`

export default WaitingUsers;