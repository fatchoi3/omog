import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat'
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../redux/modules/room';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

import WaitingChatting from '../components/WaitingChatting';
import WaitObserverList from '../components/WaitObserverList';
import WaitPlayerList from '../components/WaitPlayerList';
import GameStartBtn from '../components/GameStartBtn';
import StateChangeBtn from '../components/StateChangeBtn';
import WaitingExitBtn from '../components/WaitingExitBtn';



function Waiting({ socket }) {
    console.log("해당 페이지 최상단 페이지입니다.")
    const { roomNum } = useParams();
    const dispatch = useDispatch();
    const get_user = useSelector((state) => state.room.userInfo);
    console.log(get_user);
    const blackPlayer = useSelector((state) => state.room.blackPlayer);
    const whitePlayer = useSelector((state) => state.room.whitePlayer);
    const blackObserverList = useSelector((state) => state.room.blackObserverList);
    const whiteObserverList = useSelector((state) => state.room.whiteObserverList);
    const userId = localStorage.getItem('userId');

    const [userData, setUserData] = useState({});


    const gameStart = (e) => {
        e.preventDefault();
        // if (blackPlayer.length > 0 && whitePlayer.length > 0) {
        dispatch(roomActions.gameStartDB(blackPlayer, whitePlayer, blackObserverList, whiteObserverList,roomNum))
        // }
    };


    const goodbyeWait = async (e) => {
        e.preventDefault();
        await socket.once("bye", userId => {
            console.log(userId)
        })
        socket.disconnect();
        dispatch(roomActions.resetStateUser(userId))
        history.push('/main');
    }

    useEffect(() => {
        return () => {
            console.log("소켓이 끊어졌습니다.")
            socket.disconnect();
        };
    }, [])

    useEffect(() => {
        // socket에 닉네임 보내기
        socket.emit("nickname", userId);
        console.log(userId, ": 닉네임을 보냈습니다.");

        // socket에 입장 정보 보내기
        if (get_user.state === "whitePlayer" || "blackPlayer") {
            socket.emit("enterRoomPlayer", roomNum);
            console.log(`플레이어 입장 정보, 방번호 : ${roomNum}.`);
        } else {
            socket.emit("enterRoomObserver", roomNum);
            console.log(`옵져버 입장 정보, 방번호 : ${roomNum}`)
        }
    }, [])


    useEffect(() => {
        // const welcome = (nickname, userInfo) => {
        //     console.log("welcome 실행완료", nickname, userInfo)
        //     // setUserData((prev) => ...prev, userInfo)
        //     // if (userInfo.state === "whitePlayer") {
        //     // dispatch(roomActions.setWaitUser(userInfo))
        //     // setContent(`${nickname} 님이 white 플레이어로 입장했습니다.`);
        //     // } else if (userInfo.state === "blackPlayer") {
        //     // dispatch(roomActions.setWaitUser(userInfo))
        //     // setContent(`${nickname} 님이 black 플레이어로 입장했습니다.`);
        //     // } else if (userInfo.state === "whiteObserver") {
        //     // dispatch(roomActions.setWaitUser(userInfo))
        //     // setContent(`${nickname} 님이 백팀 관전자로 입장했습니다.`);
        //     // } else {
        //     // dispatch(roomActions.setWaitUser(userInfo))
        //     // setContent(`${nickname} 님이 흑팀 관전자로 입장했습니다.`);
        // }
        socket.on("welcome", (nickname, userInfo) => {
            console.log("되나요?")
        });

        return () => {
            socket.off("welcome");
            // socket.off("welcome", welcome);
        }
    }, [socket])



    // useEffect(() => {
    //     const receiveMessage = (data) => {
    //         console.log("받아오는 채팅", data)
    //         setMessageList((prevMessage) => prevMessage.concat(data));
    //         // setMessageList(prev => [...prev, data]);
    //         // dispatch(roomActions.messageListUpdate(data));
    //         console.log(messageList)
    //     };

    //     socket.on("chat", receiveMessage);
    //     console.log(messageList)
    //     return () => {
    //         // turning of socket listner on unmount
    //         socket.off("chat", receiveMessage);
    //     }
    // }, [])


    return (
        <div className="main_container" style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
            <div className="container_left" style={{ padding: "20px" }}>
                <WaitPlayerList />
                <StateChangeBtn socket={socket} />
                <WaitObserverList />
            </div>

            <div className="container_right" style={{ padding: "20px" }}>
                {/* <WaitingChatting roomNum={roomNum} socket={socket} /> */}
                <Chat socket={socket} userId={userId} />
                <button onClick={gameStart}> 게임 시작 </button>
                <button onClick={goodbyeWait}>나가기 버튼</button>
            </div>
        </div >
    );
}


export default React.memo(Waiting);