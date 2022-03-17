import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';

import { actionCreators as roomActions } from '../../redux/modules/room';

import WaitPlayerList from './WaitPlayerList';
import WaitObserverList from './WaitObserverList';
import StateChangeBtn from './StateChangeBtn';
import GameStartBtn from './GameStartBtn';


// 게임방 생성해서 들어올 시 임시값 blackPlayer, 유저의 정보

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

    const goodbyeWait = (e) => {
        e.preventDefault();
        socket.once("bye", userId => {
            console.log(userId)
        })
        socket.disconnect();
        dispatch(roomActions.resetStateUser(userId))
        history.push('/main');
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

        const welcome = (id, userInfos) => {
            console.log("welcome 실행완료", id, userInfos)
            // dispatch(roomActions.setWaitUser(userInfos))
            setBlackPlayer(userInfos[0].blackPlayerInfo[0])
            setWhitePlayer(userInfos[0].whitePlayerInfo[0])
            setBlackObserverList([...userInfos[0].blackTeamObserver])
            setWhiteObserverList([...userInfos[0].whiteTeamObserver])
        }

        socket.on("welcome", welcome)

        return () => {
            socket.disconnect();
        }
    }, [])


    return (
        <div>
            <div style={{ height: "76px" }}>
                로고 위치
            </div>
            <WaitPlayerList blackPlayer={blackPlayer} whitePlayer={whitePlayer} />
            <GameStartBtn socket={socket} blackPlayer={blackPlayer} whitePlayer={whitePlayer} blackObserverList={blackObserverList} whiteObserverList={whiteObserverList} roomNum={roomNum} />

            <WaitObserverList socket={socket} blackObserverList={blackObserverList} whiteObserverList={whiteObserverList} />
            <button onClick={goodbyeWait}>나가기 버튼</button>
        </div>
    );
}

export default WaitingUsers;