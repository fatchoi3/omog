import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { Text } from '../../elements';

function WaitOneChat(props) {
    console.log("Onechat")
    const { roomNum, socket } = props;
    const dispatch = useDispatch();
    const scrollRef = useRef();

    const userId = localStorage.getItem('userId');

    const [content, setContent] = useState('');
    const [chatMonitor, setChatMonitor] = useState([]);
    const [recentChat, setRecentChat] = useState('');

    const [connected, setConnected] = useState(false);

    const moveScrollToReceiveMessage = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    });


    useEffect(() => {
        const receiveChat = async () => await socket.on("chat", (data) => {
            console.log("받아오는 채팅", data)
            setRecentChat(data);
            setChatMonitor([...chatMonitor, recentChat])
            setRecentChat('');
        })

        receiveChat();
        return () => socket.disconnect();
    }, []);


    useEffect(() => {
        const setChat = async () => {
            (await recentChat.chat?.length) > 0 && setChatMonitor([...chatMonitor, recentChat])
        }
        setChat()
            .then(() => moveScrollToReceiveMessage())
        setRecentChat('');

    }, [recentChat]);


    return (
        <>
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
        </>
    );
}


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


export default WaitOneChat;