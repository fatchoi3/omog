import React, { useState, useRef } from 'react';

function WaitChatInput({ socket }) {
    const inputRef = useRef(null);
    const [inputMessage, setInputMessage] = useState({ nickname: '', chat: '' });
    const userId = localStorage.getItem('userId');


    const handleInput = (e) => {
        setInputMessage({
            ...inputMessage,
            nickname: userId,
            chat: e.target.value,
        });
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            console.log("보내는 채팅", inputMessage.chat)
            socket.emit('chat', inputMessage.chat);
            setInputMessage({ ...inputMessage, chat: '' });
            inputRef.current.value = "";
        }
    };
    return (
        <input
            // defaultValue={chatMonitor}
            onChange={handleInput}
            onKeyPress={handleEnter}
            style={{ width: "100%" }}
            ref={inputRef}
        />
    );
}

export default WaitChatInput;