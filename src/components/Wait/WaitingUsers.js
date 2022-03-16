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
    const get_user = useSelector((state) => state.room.userInfo);
    console.log(get_user);

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
        if (get_user.state === "blackPlayer" || get_user.state === "whitePlayer") {
            socket.emit("enterRoomPlayer", roomNum, get_user.state);
            console.log(`enterRoomBlackPlayer 입장, 방번호 : ${roomNum}, ${get_user.state}`);
        } else {
            socket.emit("enterRoomObserver", roomNum, get_user.state);
            console.log(`enterRoomWhiteObserver 입장, 방번호 : ${roomNum}, ${get_user.state}`)
        }

        const welcome = (id, userInfos) => {
            console.log("welcome 실행완료", id, userInfos)
            dispatch(roomActions.setWaitUser(userInfos))
            setBlackPlayer(userInfos[0])
            setWhitePlayer(userInfos[1])
            setBlackObserverList([...userInfos[2]])
            setWhiteObserverList([...userInfos[3]])
        }

        socket.on("welcome", welcome)

        return () => {
            socket.disconnect();
        }
    }, [])


    return (
        <div>
            <WaitPlayerList blackPlayer={blackPlayer} whitePlayer={whitePlayer} />
            <GameStartBtn socket={socket} blackPlayer={blackPlayer} whitePlayer={whitePlayer} blackObserverList={blackObserverList} whiteObserverList={whiteObserverList} roomNum={roomNum} />

            <WaitObserverList blackObserverList={blackObserverList} whiteObserverList={whiteObserverList} />

            <StateChangeBtn socket={socket} />
            <button onClick={goodbyeWait}>나가기 버튼</button>
        </div>
    );
}

export default WaitingUsers;