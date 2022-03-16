import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';

function WaitChat({ socket }) {
    console.log("채팅창 컴포넌트입니다. 몇 번 렌더링될까요?")
    const messageRef = useRef(null);
    const [messageList, setMessageList] = useState([]);
    const userId = localStorage.getItem("userId")


    const sendMessages = useCallback(async (e) => {
        e.preventDefault();
        console.log("보내는 채팅입니다", messageRef.current.value);
        await socket.emit("chat", messageRef.current.value);
        messageRef.current.value = '';
    }, [])


    useEffect(() => {
        socket.on("chat", (data) => {
            console.log("받아오는 채팅", data)
            setMessageList((prev) => [...prev, data]);
        });

        return () => {
            socket.off("chat");
        }
    }, [])

    return (
        <ChattingWindow>
            <ChattingHeader>
                Live Chat
            </ChattingHeader>
            {messageList ?
                <div className="chat-body">
                    <div className="message-container">
                        {messageList.map((messageContent, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={userId === messageContent.nickname ? "you" : "other"}
                                >
                                    <div>
                                        <div className="message-content">
                                            <p>{messageContent.chat}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="author">{messageContent.nickname}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                :
                <div></div>
            }
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Hey..."
                    ref={messageRef}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessages(event);
                    }}
                />
                <button onClick={(e) => sendMessages(e)}>&#9658;</button>
            </div>
        </ChattingWindow>
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
    color: white;
`

export default React.memo(WaitChat);