import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Input from '../elements/Input';
import Text from '../elements/Text';
import { actionCreators as roomActions } from '../redux/modules/room';

import { history } from '../redux/configureStore';
import { Button } from '@material-ui/core';
import WaitingChatting from '../components/WaitingChatting';
import WaitObserverList from '../components/WaitObserverList';
import WaitPlayerList from '../components/WaitPlayerList';
import socketio from "socket.io-client";

// const socket = socketio.connect("http://15.164.103.116/waiting");
const socket = socketio.connect("http://localhost:4001");


function Waiting(props) {
    const dispatch = useDispatch();
    const { roomNum } = useParams();
    // const { socket } = props;
    // console.log(roomNum, socket)

    const userId = localStorage.getItem('userId') // 로컬 스토리지에 저장되있는것
    // const get_user = useSelector((state) => state.room.waitingInfo);
    const get_user = useSelector((state) => state.room.userInfo);
    console.log(get_user)

    // const me_check = get_user.id === userId ? true : false;

    const [content, setContent] = useState('');
    const [blackPlayer, setBlackPlayer] = useState([]);
    const [whitePlayer, setWhitePlayer] = useState([]);
    const [blackObserverList, setBlackObserverList] = useState([]);
    const [whiteObserverList, setWhiteObserverList] = useState([]);


    const inputRef = useRef(null);
    const scrollRef = useRef();

    const [inputMessage, setInputMessage] = useState({ nickname: '', chat: '' });
    const [chatMonitor, setChatMonitor] = useState([]);
    const [recentChat, setRecentChat] = useState('');


    // const userInfo_base = {
    //     id: "test",
    //     score: "55%",
    //     point: 1234,
    //     state: "Aplayer",
    // }

    const handleInput = (e) => {
        setInputMessage({
            ...inputMessage,
            nickname: userId,
            chat: e.target.value,
        });
    };


    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            console.log("보내는 채팅", inputMessage)
            socket.emit('chat', inputMessage);
            setInputMessage({ ...inputMessage, chat: '' });
            inputRef.current.value = "";
        }
    };

    const moveScrollToReceiveMessage = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    });

    const handleChangeState = () => {
        if (get_user.state === "whitePlayer" || get_user.state === "blackPlayer") {
            socket.emit("changeToObserver", "observer")
        }

        socket.emit("changeToPlayer", "player")
    };

    const goodbyeWait = async () => {
        const io = socketio.connect("http://15.164.103.116/waiting");
        await io.on("bye", userId => {
            console.log(userId)
        })
        io.disconnect();
        history.push('/main');
    }

    const gameStart = () => {
        // if (blackPlayer.length > 0 && whitePlayer.length > 0 && blackObserverList.length > 0 && whiteObserverList.length > 0)
        dispatch(roomActions.gameStartDB(blackPlayer, whitePlayer, blackObserverList, whiteObserverList))
    }


    // useEffect(() => {
    //     const io = socketio.connect("http://15.164.103.116/waiting");
    //     io.on("moveToObserver", (id) => {
    //         setBlackPlayer('')
    //         setBlackObserverList([...blackObserverList, id])
    //         console.log(id);
    //     });

    //     io.on("moveToPlayer", (id) => {
    //         setBlackObserverList([...blackObserverList])
    //         setBlackPlayer()
    //         console.log(id);
    //     });

    //     return () => {
    //         io.off();
    //         io.disconnect();
    //     };
    // }, [])


    useEffect(() => {
        dispatch(roomActions.getWaitingInfoDB(userId));
        const io = socketio.connect("http://15.164.103.116/waiting");

        // if (!socket) return;
        // 대기실 입장
        // socket.connect();
        // io.on("connect", () => {
        //     // console.log("연결되었습니다.", io.connected);

        // });

        io.emit("nickname", userId);
        console.log(userId, "닉네임을 보냈습니다.");

        // 입장 정보 보내기
        if (get_user.state === "whitePlayer" || "blackPlayer") {
            io.emit("enterRoomPlayer", roomNum);
            console.log(`플레이어 입장 정보를 방번호 : ${roomNum}로 보냈습니다.`);
        } else {
            io.emit("enterRoomObserver", roomNum);
            console.log(`옵져버 입장 정보를 방번호 : ${roomNum}로 보냈습니다.`)
        }

        io.on("welcome", (nickname, userInfo) => {
            console.log("welcome 실행완료", nickname, userInfo)

            if (userInfo.state === "whitePlayer") {
                setWhitePlayer([...whitePlayer, userInfo]);
                setContent(`${nickname} 님이 white 플레이어로 입장했습니다.`);
            } else if (whitePlayer.length > 0 || userInfo.state === "blackPlayer") {
                setBlackPlayer([...blackPlayer, userInfo])
                setContent(`${nickname} 님이 black 플레이어로 입장했습니다.`);
            } else if (userInfo.state === "whiteObserver") {
                setWhiteObserverList([...whiteObserverList, userInfo]);
                setContent(`${nickname} 님이 백팀 관전자로 입장했습니다.`);
            } else {
                setBlackObserverList([...blackObserverList, userInfo]);
                setContent(`${nickname} 님이 흑팀 관전자로 입장했습니다.`);
            }
        });

        // const receiveChat = async () => await socket.on("chat", (data) => {
        //     console.log("받아오는 채팅", data)
        //     setRecentChat(data);
        //     setChatMonitor([...chatMonitor, recentChat])
        //     setRecentChat('');
        // })

        // receiveChat();

        return () => {
            io.off();
            io.disconnect();
        };
    }, [])


    // useEffect(() => {
    //     const receiveChat = async () => await socket.on("chat", (data) => {
    //         console.log("받아오는 채팅", data)
    //         setRecentChat(data);
    //         setChatMonitor([...chatMonitor, recentChat])
    //         setRecentChat('');
    //     })

    //     receiveChat();
    // }, []);


    // useEffect(() => {
    //     const setChat = async () => {
    //         (await recentChat.chat?.length) > 0 && setChatMonitor([...chatMonitor, recentChat])
    //     }

    //     setChat()
    //         .then(() => moveScrollToReceiveMessage())
    //     setRecentChat('');

    // }, [recentChat]);

    // 서버에서 받은 입력값을 로컬 상태값으로 갱신하는 함수(바로 밑의 함수로 연결된다)
    useEffect(() => {
        const io = socketio.connect("http://15.164.103.116/waiting");
        io.on('chat', (chat) => {
            setRecentChat(chat);
        });
    }, []);

    // 서버에서 갱신된 내용(recentChat)을 받았을 때 로컬 채팅창에 추가하는 함수
    useEffect(() => {
        recentChat.length > 0 && setChatMonitor([...chatMonitor, recentChat]);
        setRecentChat('');
        // 채팅값 초기화 : 이렇게 설정하지 않으면 같은 채팅이 반복됐을 때 이 함수가 반응하지 않는다.
    }, [recentChat]);



    return (
        <div className="main_container" style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
            <div className="container_left" style={{ padding: "20px" }}>

                <WaitPlayerList whitePlayer={whitePlayer} blackPlayer={blackPlayer} />

                <div className="button_box" style={{ textAlign: "center" }}>
                    <button style={{ width: "50px", border: "1px solid pink" }} onClick={handleChangeState}>버튼</button>
                </div>

                <WaitObserverList whiteObserverList={whiteObserverList} blackObserverList={blackObserverList} />

            </div>
            <div className="container_right" style={{ padding: "20px" }}>
                {/* <WaitingChatting
                    socket={socket}
                    blackPlayer={blackPlayer}
                    whitePlayer={whitePlayer}
                    blackObserverList={blackObserverList}
                    whiteObserverList={whiteObserverList}
                    userId={userId}
                    me={me_check}
                    content={content}
                /> */}

                <ChattingWindow>
                    <ChattingHeader>
                        <Text
                            is_padding="0.7em 1em"
                            is_color="#fff"
                            is_bold="700"
                            is_height="45px"
                        >
                            Live Chat
                        </Text>
                    </ChattingHeader>
                    <div className="welcome-message" style={{ textAlign: "center" }}>
                        <span style={{ color: "purple", fontWeight: "800" }}>{userId}</span> 님 환영합니다!
                    </div>
                    {
                        content.length > 0 ?
                            <div className="user-message" style={{ textAlign: "center" }}>
                                <span>{content}</span>
                            </div>
                            :
                            null
                    }
                    <div className="chat-body" style={{ width: "100%", height: "100%", overflowX: "hidden" }} ref={scrollRef}>
                        {chatMonitor.map((messageContent, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="Message-box"
                                    style={{
                                        display: "flex",
                                        justifyContent: messageContent.nickname === userId ? "flex-end" : "flex-star",
                                        margin: "5px 0 5px 0"
                                    }}>
                                    <div>
                                        <MessageContent
                                            style={{ backgroundColor: messageContent.nickname === userId ? "cornflowerblue" : "#43a047" }}>
                                            <Text is_padding="3px" is_margin="3px" >{messageContent.chat}</Text>
                                        </MessageContent>
                                        <MessageMeta
                                            style={{ justifyContent: messageContent.nickname === userId ? "flex-end" : "flex-star" }}
                                        >
                                            <Text is_margin="0 3px" is_bold="600">{messageContent.nickname}</Text>
                                        </MessageMeta>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="chat-footer"
                        style={{
                            height: "40px",
                            border: "1px solid #263238",
                            borderTop: "none",
                            display: "flex",
                        }}>
                        <input
                            value={chatMonitor}
                            onChange={handleInput}
                            onKeyPress={handleEnter}
                            style={{ width: "100%" }}
                            ref={inputRef}
                        />
                        {/* <Button
                        _onClick={handleEnter}
                        is_width="30%"
                    >
                        &#9658;
                    </Button>  */}
                    </div>
                </ChattingWindow>
                <button onClick={goodbyeWait}>나가기 버튼</button>
                <button onClick={gameStart}>게임 시작</button>


            </div>
        </div >
    );
}


const ChattingWindow = styled.div`
    width: 300px;
    height: 600px;
    border: 5px solid gray;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`

const ChattingHeader = styled.div`
    height: 45px;
    border-radius: 5px;
    background: #263238;
    cursor: pointer;
    margin-top: 0;
`

const MessageContent = styled.div`
    width: auto;
    height: auto;
    min-height: 40px;
    max-width: 120px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    margin-right: 5px;
    margin-left: 5px;
    padding-right: 5px;
    padding-left: 5px;
    overflow-wrap: break-word;
    word-break: break-word;
`

const MessageMeta = styled.div`
    display: flex;
    width: auto;
    fontSize: 12px;
    marginLeft: 5px;
    marginRight: 5px;
`



export default Waiting;