import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import "./chat.css";

import { useParams } from "react-router-dom";
import io from "socket.io-client";
// const socket = socketio.connect("http://localhost:4001");


function Waiting2({ openChat }) {
    const params = useParams();
    const roomNum = params.roomNum;
    let userId = localStorage.getItem("userId");

    const [chatMessage, setChatMessage] = useState("");
    const [chat, setChat] = useState([]);
    const socket = useRef();
    const oneChat = useRef();
    const renderOneChat = oneChat.current;

    const userInfo_base = {
        id: "test6",
        score: "55%",
        point: 1234,
        state: "blackPlayer",
    }

    useEffect(() => {
        // socket.current = io("http://15.164.103.116/waiting");
        socket.current = io.connect("http://localhost:4001");
        socket.current.on("connect", () => {
            console.log("연결되었습니다.", socket.current.connected);
            socket.current.emit("nickname", userId);
            console.log(userId, "닉네임을 보냈습니다.");

            // 입장 정보 보내기
            if (userInfo_base.state === "whitePlayer" || "blackPlayer") {
                socket.current.emit("enterRoomPlayer", roomNum);
                console.log(`플레이어 입장 정보를 방번호 : ${roomNum}로 보냈습니다.`);
            } else {
                socket.current.emit("enterRoomObserver", roomNum);
                console.log(`옵져버 입장 정보를 방번호 : ${roomNum}로 보냈습니다.`)
            }
        });

        socket.current.on("chat", (data) => {
            console.log("받는 메세지", data)
            let nickname = data.nickname;
            let chat = data.chat;
            setChat([...chat, { nickname, chat }]);
        });
    }, [chat]);

    // useEffect(() => {
    //     socket.current = io.connect("http://localhost:4001");

    // socket.current.on("chat", (data) => {
    //     console.log("받는 메세지", data)
    //     let nickname = data.nickname;
    //     let chat = data.chat;
    //     setChat([...chat, { nickname, chat }]);
    // });

    // return () => {
    //     socket.current.disconnect();
    // };
    // }, [chat])

    const sendChat = () => {
        if (chatMessage !== "") {
            console.log("보내는 메세지", chatMessage)
            socket.current.emit("chat", chatMessage);
            setChatMessage("");
        }
    };

    const sendMessage = (e) => {
        setChatMessage(e.target.value);
    };

    const renderChat = () => {
        return chat.map((c, index) => (
            <div
                key={index}
                className={"test6" === c.nickname ? "chat_from_me" : "chat_from_friend"}
            >
                {
                    "test6" !== c.nickname
                        ?
                        <div className="chat_nick">{c.nickname}</div>
                        :
                        <div>{c.nickname}</div>
                }
                <div div className="chat_content">
                    <div className="chat_message">{c.chat}</div>
                </div>
            </div>
        ));
    };

    const viewBottom = () => {
        renderOneChat?.lastChild?.lastChild.scrollIntoView();
    };

    return (
        <>
            <ChatContainer>
                <p className="header_modal_title">그룹채팅</p>
                <div className="header_modal_hr"></div>

                <div className="group_chat_container">
                    <div className="chat_render_oneChat" ref={oneChat}>
                        {renderChat()}
                        {viewBottom()}
                    </div>
                    <div className="chat_textfield_container">
                        <input
                            type="text"
                            className="chat_textfield"
                            placeholder="메시지를 작성해주세요."
                            name="oneChat"
                            value={chatMessage}
                            onChange={sendMessage}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    sendChat();
                                }
                            }}
                        />
                        <span className="chat_send_btn">
                            <div onClick={sendChat} />
                        </span>
                    </div>
                </div>
            </ChatContainer>
        </>
    );
}

export default Waiting2;

const ChatContainer = styled.div`
    position: relative;
    height: 85vh;
    margin: 0 4.17vw;
    box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
    border-radius: 16px;
    box-sizing: border-box;
    width: 22%;

    .group_chat_container {
        padding: 18px;
        height: calc(100% - 150px);
    }
    .chat_render_oneChat {
        height: 100%;
        overflow: auto;
    }
    .chat_textfield_container {
        position: absolute;
        bottom: 20px;
        width: 92%;
        left: 50%;
        transform: translateX(-50%);
    }
    .header_modal_title {
        margin: 3.07vh 18px 2.56vh;
    }
`;

const BlockChat = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    text-align: center;
    z-index: 1;

    > .blockBG {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.8;
    border-radius: 16px;
    }
    > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4.17vw;
        opacity: 1;
        z-index: 1;
    }

    &&.focusTime {
        display: block;
    }
`;