import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, userId }) {
    console.log("dlrjs")
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async (e) => {
        console.log("보내는 채팅", currentMessage)
        e.preventDefault();
        if (currentMessage !== "") {
            await socket.emit("chat", currentMessage);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.once("chat", (data) => {
            console.log("받아오는 채팅", data)
            setMessageList((list) => [...list, data]);
        });

        return () => {
            socket.off("chat")
        }
    }, [currentMessage]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
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
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;