import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Input from '../elements/Input';
import Text from '../elements/Text';
import { actionCreators as roomActions } from '../redux/modules/room';
import { history } from '../redux/configureStore';

import WaitingChatting from '../components/WaitingChatting';
import WaitObserverList from '../components/WaitObserverList';
import WaitPlayerList from '../components/WaitPlayerList';
import io from "socket.io-client";

// const socket = io.connect("http://15.164.103.116/waiting");
// const socket = io.connect("http://localhost:4001");


function Waiting(props) {
    console.log("몇번?")
    const dispatch = useDispatch();
    const { roomNum } = useParams();
    const socket = React.useRef();

    // 로컬 스토리지에 저장되있는것
    const userId = localStorage.getItem('userId');

    // 리듀서에 저장되있는 유저 정보
    const get_user = useSelector((state) => state.room.user);
    const blackPlayer = useSelector((state) => state.room.blackPlayer);
    const whitePlayer = useSelector((state) => state.room.whitePlayer);
    const blackObserverList = useSelector((state) => state.room.blackObserverList);
    const whiteObserverList = useSelector((state) => state.room.whiteObserverList);
    console.log(get_user[0])
    console.log("blackPlayer", blackPlayer)
    console.log("whitePlayer", whitePlayer)
    console.log("blackObserverList", blackObserverList)
    console.log("whiteObserverList", whiteObserverList)

    // const me_check = get_user.id === userId ? true : false;

    // 입장 알림
    const [content, setContent] = useState('');


    const handleChangeState = () => {
        console.log("여기입니다.", get_user[0])

        if (get_user[0].state === "whitePlayer" || get_user[0].state === "blackPlayer" || get_user[0].state === '') {
            socket.current.emit("changeToObserver", "observer")
            console.log("옵져버로 변경");
            let get_user2 = { ...get_user[0], state: "blackObserver" };
            dispatch(roomActions.setWaitUser(get_user2))
        } else {
            socket.current.emit("changeToPlayer", "player")
            console.log("플레이어로 변경");
            let get_user2 = { ...get_user[0], state: "blackPlayer" };
            dispatch(roomActions.setWaitUser(get_user2))
        }
    };


    const gameStart = () => {
        // if (blackPlayer.length > 0 && whitePlayer.length > 0) {
        dispatch(roomActions.gameStartDB(blackPlayer, whitePlayer, blackObserverList, whiteObserverList))
        // }
    }

    const goodbyeWait = async () => {
        // socket.current = io("http://localhost.com:4001");
        await socket.current.on("bye", userId => {
            console.log(userId)
        })
        socket.current.disconnect();
        history.push('/main');
    }

    // useEffect(() => {
    //     dispatch(roomActions.getWaitingInfoDB(userId));
    // }, [])


    useEffect(() => {
        socket.current = io("http://15.164.103.116/waiting");
        // socket.current = io("http://localhost.com:4001");

        socket.current.emit("nickname", userId);
        console.log(userId, "닉네임을 보냈습니다.");

        // 입장 정보 보내기
        if (get_user.state === "whitePlayer" || "blackPlayer") {
            socket.current.emit("enterRoomPlayer", roomNum);
            console.log(`플레이어 입장 정보를 방번호 : ${roomNum}로 보냈습니다.`);
        } else {
            socket.current.emit("enterRoomObserver", roomNum);
            console.log(`옵져버 입장 정보를 방번호 : ${roomNum}로 보냈습니다.`)
        }

        socket.current.on("welcome", (nickname, userInfo) => {
            console.log("welcome 실행완료", nickname, userInfo)

            if (userInfo.state === "whitePlayer") {
                dispatch(roomActions.setWaitUser(userInfo))
                // setContent(`${nickname} 님이 white 플레이어로 입장했습니다.`);
            } else if (whitePlayer.length > 0 || userInfo.state === "blackPlayer") {
                dispatch(roomActions.setWaitUser(userInfo))
                // setContent(`${nickname} 님이 black 플레이어로 입장했습니다.`);
            } else if (userInfo.state === "whiteObserver") {
                dispatch(roomActions.setWaitUser(userInfo))
                // setContent(`${nickname} 님이 백팀 관전자로 입장했습니다.`);
            } else {
                dispatch(roomActions.setWaitUser(userInfo))
                // setContent(`${nickname} 님이 흑팀 관전자로 입장했습니다.`);
            }
        });
    }, [])

    // useEffect(() => {
    //     // socket.current = io("http://localhost.com:4001");
    //     socket.current = io("http://15.164.103.116/waiting");

    //     socket.current.on("welcome", (nickname, userInfo) => {
    //         console.log("welcome 실행완료", nickname, userInfo)

    //         if (userInfo.state === "whitePlayer") {
    //             dispatch(roomActions.setWaitUser(userInfo))
    //             // setContent(`${nickname} 님이 white 플레이어로 입장했습니다.`);
    //         } else if (whitePlayer.length > 0 || userInfo.state === "blackPlayer") {
    //             dispatch(roomActions.setWaitUser(userInfo))
    //             // setContent(`${nickname} 님이 black 플레이어로 입장했습니다.`);
    //         } else if (userInfo.state === "whiteObserver") {
    //             dispatch(roomActions.setWaitUser(userInfo))
    //             // setContent(`${nickname} 님이 백팀 관전자로 입장했습니다.`);
    //         } else {
    //             dispatch(roomActions.setWaitUser(userInfo))
    //             // setContent(`${nickname} 님이 흑팀 관전자로 입장했습니다.`);
    //         }
    //     });
    // }, [])


    return (
        <div className="main_container" style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
            <div className="container_left" style={{ padding: "20px" }}>

                <WaitPlayerList />

                <div className="button_box" style={{ textAlign: "center" }}>
                    <button style={{ width: "50px", border: "1px solid pink" }} onClick={handleChangeState}>버튼</button>
                </div>

                <WaitObserverList />

            </div>
            <div className="container_right" style={{ padding: "20px" }}>

                <WaitingChatting
                    socket={socket}
                    userId={userId}
                    content={content}
                />

                <button onClick={goodbyeWait}>나가기 버튼</button>
                <button onClick={gameStart}> 게임 시작 </button>


            </div>
        </div >
    );
}


export default Waiting;