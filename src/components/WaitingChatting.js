import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";


const socket = io.connect("http://localhost:3001");

function WaitingChatting(props) {
    // const { roomNum } = props;
    // const user_list = props.userList;

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [userInformation, setUserInformation] = useState([]);


    const id = "아이디1";
    const score = 150;
    const point = 1000;
    const state = "player";
    const roomNum = "123";

    useEffect(() => {
        const receiveChat = () => socket.on("chat", (messageData) => {
            // data =  {nickname, chat}
            console.log("받아오는 채팅", messageData)
            setMessageList((list) => [...list, messageData]);
        });
        receiveChat();
    }, [socket]);


    const sendMessage = async () => {
        if (currentMessage !== "") {
            const data = {
                roomNum: roomNum,
                chat: currentMessage,
            };

            await socket.emit("chat", currentMessage);
            setCurrentMessage((list) => [...list, data]);
            setCurrentMessage("");
        }
    };

    const goodbyeChat = async () => {
        await socket.emit("bye", id);
    }


    return (
        <>
            <ChattingWindow>
                <div className="chat-header"
                    style={{
                        height: "45px",
                        borderRadius: "5px",
                        background: "#263238",
                        position: "relative",
                        cursor: "pointer",
                        marginTop: "0",
                    }}>
                    <p style={{
                        display: "block",
                        padding: "0 1em 0 2em",
                        color: "#fff",
                        fontWeight: "700",
                        lineHeight: "45px",
                        margin: "0",
                    }}>
                        Live Chat
                    </p>
                </div>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map((messageContent, idx) => {
                            return (
                                <div
                                    className="message"
                                    id={id === messageContent.author ? "you" : "other"}
                                    key={idx}
                                >
                                    <div>
                                        <div className="message-content">
                                            <p>{messageContent.chat}</p>
                                        </div>
                                        <div className="message-meta">
                                            {/* <p id="time">{messageContent.time}</p> */}
                                            <p id="author">{messageContent.nickname}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer">
                    <input
                        type="text"
                        value={currentMessage}
                        placeholder=""
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </ChattingWindow>
            <button onClick={goodbyeChat}>나가기 버튼</button>
        </>
    );
}

const ChattingWindow = styled.div`
    width: 300px;
    height: 420px;
    border: 5px solid gray;
    border-radius: 5px;
`



export default WaitingChatting;