import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import WaitingChatting from '../components/WaitingChatting';
import WaitObserverList from '../components/WaitObserverList';
import WaitPlayerList from '../components/WaitPlayerList';


function Waiting(props) {
    const { roomNum } = useParams();
    const { socket } = props;
    console.log(roomNum, socket)

    const userId = localStorage.getItem('userId') // 로컬 스토리지에 저장되있는것
    const get_user = useSelector((state) => state.user.userInfo);
    console.log(get_user)
    const me_check = get_user.id === userId ? true : false;

    const [content, setContent] = React.useState('');
    const [blackPlayer, setBlackPlayer] = React.useState({});
    const [whitePlayer, setWhitePlayer] = React.useState({});
    const [blackObserverList, setBlackObserverList] = React.useState([]);
    const [whiteObserverList, setWhiteObserverList] = React.useState([]);

    const userInfo_base = {
        id: "test",
        score: "55%",
        point: 1234,
        state: "Aplayer",
    }


    // socket.on("connect", () => {
    //     const room2 = "blackTeam"
    //     const title = document.createElement("h3")
    //     title.innerText = `Room Name: ${roomName}`
    //     chatTitle.appendChild(title)
    //     socket.emit("nickname", id)
    //     socket.emit("enter_room", roomName, room2)
    //     const li = document.createElement("li");
    //     li.innerText = `${id}님이 입장하셨습니다!`;
    //     chatBox.appendChild(li);

    // });

    // socket.on("welcome", (user) => {
    // addMessage(`${user}님이 입장하셨습니다!`)
    // })


    useEffect(() => {
        if (!socket) return;
        socket.on("connect", () => {
            console.log("연결되었습니다.")
            console.log(socket.connected);
            socket.emit("nickname", userId);
            console.log(userId, "닉네임을 보냈습니다.");

            if (userInfo_base.state === "Aplayer" || "Bplayer") {
                socket.emit("enterRoomPlayer", roomNum);
                console.log(`플레이어 입장 정보를 방번호 : ${roomNum}로 보냈습니다.`);
            } else {
                socket.emit("enterRoomObserver", roomNum);
                console.log(`옵져버 입장 정보를 방번호 : ${roomNum}로 보냈습니다.`)
            }
        });

        socket.on("welcome", (nickname, userInfo) => {
            console.log(nickname, userInfo)
            console.log("welcome 실행완료", nickname, userInfo)
            if (userInfo.state === "player") {
                setWhitePlayer(userInfo);
                setContent(`${nickname} 님이 플레이어로 입장했습니다.`);
            } else if (userInfo.state === "Bplayer") {
                setBlackPlayer(userInfo);
                setContent(`${nickname} 님이 플레이어로 입장했습니다.`);
            } else if (userInfo.state === "Aobserver") {
                setWhiteObserverList([...whiteObserverList, userInfo]);
                setContent(`${nickname} 님이 백팀 관전자로 입장했습니다.`);
            } else {
                setBlackObserverList([...blackObserverList, userInfo]);
                setContent(`${nickname} 님이 흑팀 관전자로 입장했습니다.`);
            }
        });
    }, [])


    const handleChangeState = () => {
        socket.emit("changeToPlayer", "player")
            .then(() => {
                socket.on("moveToPlayer", (id) => {

                })
            })
    }

    return (
        <div className="main_container" style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
            <div className="container_left" style={{ padding: "20px" }}>

                <WaitPlayerList whitePlayer={whitePlayer} blackPlayer={blackPlayer} />

                <div className="button_box" style={{ textAlign: "center" }}>
                    <Button is_width="10px" is_border="1px solid pink" _onClick={handleChangeState}>버튼</Button>
                </div>

                <WaitObserverList whiteObserverList={whiteObserverList} blackObserverList={blackObserverList} />

            </div>
            <div className="container_right" style={{ padding: "20px" }}>
                <WaitingChatting
                    socket={socket}
                    blackPlayer={blackPlayer}
                    whitePlayer={whitePlayer}
                    blackObserverList={blackObserverList}
                    whiteObserverList={whiteObserverList}
                    userId={userId}
                    me={me_check}
                    content={content}
                />
            </div>
        </div >
    );
}


export default Waiting;