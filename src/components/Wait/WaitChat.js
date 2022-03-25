import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Text, Input, Button } from '../../elements';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function WaitChat({ socket, roomNum }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const messageRef = useRef(null);
    const scrollRef = useRef();
    const [messageList, setMessageList] = useState([]);
    const userId = localStorage.getItem("userId")


    const sendMessages = useCallback(async (e) => {
        e.preventDefault();
        const data = { roomNum: roomNum, chat: messageRef.current.value }
        await socket.emit("chat", data);
        messageRef.current.value = '';
    }, [])

    const moveScrollToReceiveMessage = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    });

    const exitWaiting = (e) => {
        e.preventDefault();
        history.push('/main');
    }


    useEffect(() => {
        const setChat = async () => {
            await socket.on("chat", (chatData) => {
                setMessageList((prev) => [...prev, chatData]);
            })
        }

        setChat()
            .then(() => moveScrollToReceiveMessage())

        return () => {
            socket.off("chat");
        }
    }, [messageList])

    return (
        <ChattingWindow>
            <ChattingHeader>
                <Text
                    is_size="1.6rem"
                    is_center="left"
                    is_margin="13px 22px"
                    is_line_height="30px"
                >
                    실시간 채팅
                </Text>
                <Button
                    is_size="1.5rem"
                    is_width="40%"
                    is_border="none"
                    is_radius="0 14px 0 0"
                    // is_padding="13px 20px"
                    is_line_height="31px"
                    is_color="black"
                    is_weight="600"
                    is_background="#94D7BB"
                    _onClick={exitWaiting}
                    is_hover="inset -5em 0 0 0 red, inset 5em 0 0 0 red"
                >
                    나가기&#9654;
                </Button>
            </ChattingHeader>
            <ChattingContent ref={scrollRef}>
                {messageList.map((messageContent, idx) => {
                    let isMyMessage = messageContent.nickname === userId

                    return (
                        <MessageBox key={idx} isMyMessage={isMyMessage}>
                            <div>
                                <MessageMeta isMyMessage={isMyMessage}>
                                    <Text is_margin="5px 5px" is_size="14px" is_bold="600" is_line_height="16.8px">{messageContent.nickname}</Text>
                                </MessageMeta>
                                <MessageContent isMyMessage={isMyMessage}>
                                    <Text is_padding="3px" is_margin="3px" >{messageContent.chat}</Text>
                                </MessageContent>
                            </div>
                        </MessageBox>
                    );
                })}
            </ChattingContent>
            <ChattingInputContainer>
                <Input
                    ref={messageRef}
                    is_box_sizing="border-box"
                    placeholder="say something..."
                    is_font_size="14px"
                    is_padding="17px 21px"
                    is_border="none"
                    is_width="70%"
                    is_radius="0 0 0 14px"
                    is_outline="none"
                    _onKeyPress={(e) => e.key === "Enter" && sendMessages(e)}
                >
                </Input>
                <Button
                    is_border="none"
                    is_width="30%"
                    is_color="#6DB6DF"
                    is_size="18px"
                    is_weight="700"
                    is_hover="inset -3.5em 0 0 0 #94D7BB, inset 3.5em 0 0 0 #94D7BB"
                    _onClick={sendMessages}
                    is_radius="0 0 14px 0"
                >
                    SEND
                </Button>
            </ChattingInputContainer>
        </ChattingWindow>
    );
}


const ChattingWindow = styled.div`
    width: 100%;
    min-width: 18rem;
    max-width: 350px;
    height: 50vh;
    min-height: 32rem;
    background: white;
    border: 2px solid black;
    border-radius: 14px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: -3px 3px 6px 1px #A8937340;
`

const ChattingHeader = styled.div`
    display: flex;
    height: 57px;
    border-radius: 14px 14px 0 0;
    background: #94D7BB;
    color: white;
    justify-content: space-between;
    box-sizing: border-box;
`

const ChattingInputContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    border-top: 1px solid #D1D1D1;
    height: 50px;
    overflow: hidden;
`

const ChattingContent = styled.div`
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0
`

const MessageBox = styled.div`
    display: flex;
    justify-content: ${props => props.isMyMessage === true ? "flex-end" : "flex-start"};
    margin: ${props => props.isMyMessage === true ? "5px 27px 5px 0" : "5px 0 5px 27px"};
`

const MessageContent = styled.div`
    display: flex;
    width: auto;
    height: auto;
    min-height: 40px;
    max-width: 250px;
    border-radius: ${props => props.isMyMessage === true ? "10px 0px 10px 10px" : "00px 10px 10px 10px"};
    background-color: ${props => props.isMyMessage === true ? "cornflowerblue" : "#94D7BB"};
    color: white;
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
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    justify-content: ${props => props.isMyMessage === true ? "flex-end" : "flex-sart"}
`

export default WaitChat;