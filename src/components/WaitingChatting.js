import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Text from '../elements/Text';

import ScrollToBottom from "react-scroll-to-bottom";


function WaitingChatting(props) {
    // const { roomNum } = props;
    const inputRef = useRef(null);

    const { socket, blackPlayer, whitePlayer, blackObserverList, whiteObserverList } = props;

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [userInformation, setUserInformation] = useState([]);


    const id = "아이디1";


    useEffect(() => {
        const receiveChat = () => socket.on("chat", (chat) => {
            // chat =  {nickname, chat}
            console.log("받아오는 채팅", chat)
            setMessageList((list) => [...list, chat]);
        });
        receiveChat();
    }, [socket]);


    const sendMessage = async () => {
        if (currentMessage !== "") {
            const chat = {
                nickname: id,
                chat: currentMessage,
            };

            await socket.emit("chat", chat);
            setCurrentMessage((list) => [...list, chat]);
            inputRef.current.value = "";
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
                        // position: "relative",
                        cursor: "pointer",
                        marginTop: "0",
                    }}>
                    <Text
                        is_padding="0.7em 1em"
                        is_color="#fff"
                        is_bold="700"
                        is_height="45px"
                    >
                        Live Chat
                    </Text>
                </div>

                <div className="chat-body" style={{ width: "100%", height: "100%", overflowX: "hidden" }}>
                    <ScrollToBottom className="message-container">
                        {messageList.map((messageContent, idx) => {
                            return (
                                <div
                                    className={messageContent.author ? "you" : "other"}
                                    key={idx}
                                    style={{
                                        height: "auto",
                                        padding: "10px",
                                        display: "flex",
                                    }}
                                >
                                    <div>
                                        <MessageContent>
                                            <Text is_padding="0 3px">{messageContent.chat}</Text>
                                        </MessageContent>
                                        <div className="message-meta"
                                            style={{
                                                display: "flex",
                                                fontSize: "12px"
                                            }}
                                        >
                                            <Text is_margin="0 0 0 10px" is_bold="600">{messageContent.nickname}</Text>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer"
                    style={{
                        height: "40px",
                        border: "1px solid #263238",
                        borderTop: "none",
                        display: "flex",
                    }}>
                    <Input
                        // defaultValue={currentMessage}
                        _onChange={(e) => setCurrentMessage(e.target.value)}
                        _onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }}
                        is_width="100%"
                        ref={inputRef}
                    />
                    <Button
                        _onClick={sendMessage}
                        is_width="30%"
                    >
                        &#9658;
                    </Button>
                </div>
            </ChattingWindow>
            {/* <button onClick={goodbyeChat}>나가기 버튼</button> */}
        </>
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

const MessageContent = styled.div`
    width: auto;
    height: auto;
    min-height: 40px;
    max-width: 120px;
    background-color: #43a047;
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



export default WaitingChatting;