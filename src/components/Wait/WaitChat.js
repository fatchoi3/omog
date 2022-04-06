import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Text } from '../../elements';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { actionCreators as roomActions } from '../../redux/modules/room';


function WaitChat({ socket, roomNum }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const messageRef = useRef(null);
    const scrollRef = useRef();
    const [messageList, setMessageList] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const userId = sessionStorage.getItem("userId")

    const sendMessages = useCallback(async (e) => {
        setDisabled(true);
        e.preventDefault();
        const data = { roomNum: roomNum, chat: messageRef.current.value };
        await socket.emit("chat", data);
        messageRef.current.value = '';
        let delay = setTimeout(() => {
            setDisabled(false)
        }, 1500);
    }, [])

    const moveScrollToReceiveMessage = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        };
    });

    const exitWaiting = (e) => {
        e.preventDefault();
        history.push('/main');
    }

    useEffect(() => {
        // 대기방 접속한 인원 정보 받기
        const welcome = (id, userInfos) => {
            console.log("welcome 실행완료", id, userInfos);
            dispatch(roomActions.setWaitUser(id, userInfos));
            setMessageList((prev) => [...prev, { nickname: 'Welcome!', chat: `${id}님이 대기방에 입장하셨습니다.` }]);
        }
        socket.on("welcome", welcome)
    }, [])


    useEffect(() => {
        const setChat = async () => {
            await socket.on("chat", (chatData) => {
                setMessageList((prev) => [...prev, chatData]);
            });
        }

        setChat()
            .then(() => moveScrollToReceiveMessage());

        return () => {
            socket.off("chat");
        }
    }, [messageList])


    useEffect(() => {
        // 방 나갈 때 방 남은 인원 정보 업데이트
        const byeChangeState = (id, userInfos) => {
            console.log("bye 정보", id, userInfos);
            dispatch(roomActions.changeState(id, userInfos));
            setMessageList((prev) => [...prev, { nickname: 'Goodbye!', chat: `${id}님이 대기방을 떠나셨습니다.` }]);
        }
        socket.on("bye", byeChangeState);
    }, [])

    return (
        <ChattingWindow>
            <ChattingHeader>
                <div>
                    <span>
                        실시간 채팅
                    </span>
                </div>
                <div>
                    <button onClick={exitWaiting}>
                        나가기 &gt;
                    </button>
                </div>
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
                                    <Text is_padding="3px" is_size="18px" is_margin="3px" is_line_height="21.6px" >{messageContent.chat}</Text>
                                </MessageContent>
                            </div>
                        </MessageBox>
                    );
                })}
            </ChattingContent>
            <ChattingInputForm onSubmit={sendMessages}>
                <input
                    type="text"
                    placeholder="say something..."
                    ref={messageRef}
                    autoFocus
                />
                <button disabled={disabled} type="submit">SEND</button>
            </ChattingInputForm>
        </ChattingWindow>
    );
}


const ChattingWindow = styled.div`
    width: 100%;
    min-width: 20rem;
    max-width: 350px;
    height: calc(100vh - 40px);
    max-height: 50rem;
    background: white;
    border: 2px solid black;
    border-radius: 14px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: -3px 3px 6px 1px #A8937340;
`;

const ChattingHeader = styled.div`
    display: flex;
    height: 57px;
    padding: 0 15px;
    border-radius: 14px 14px 0 0;
    background: #94D7BB;
    color: white;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    >div:nth-child(1) {
        >span {
            color: #fff;
            font-size: 18px;
            line-height: 21.6px;
        }
    }

    >div:nth-child(2) {
        >button {
            font-size: 18px;
            font-weight: 400;
            line-height: 21.6px;
            background-color: #94D7BB;
            border: none;
            cursor: pointer;
        }
    }
`

const ChattingInputForm = styled.form`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    border-top: 2px solid #000;
    border-radius: 0;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    height: 50px;
    overflow: hidden;

    >input {
        box-sizing: border-box;
        width: 70%;
        font-size: 14px;
        padding: 17px 21px;
        border: none;
        border-radius: 0 0 0 14px;
        outline: none;
    }

    >button {
        width: 30%;
        color: #6DB6DF;
        font-size: 18px;
        font-weight: 700;
        border: none;
        border-radius: 0 0 14px 0;
        transition: 0.25s;
        background-color: #fff;

        &:hover {
            box-shadow: 
                inset -3em 0 0 0 #94D7BB,
                inset 3em 0 0 0 #94D7BB;
        }
    }
`;

const ChattingContent = styled.div`
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0
`;

const MessageBox = styled.div`
    display: flex;
    justify-content: ${props => props.isMyMessage === true ? "flex-end" : "flex-start"};
    margin: ${props => props.isMyMessage === true ? "5px 24px 5px 0" : "5px 0 5px 24px"};
`;

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
`;

const MessageMeta = styled.div`
    display: flex;
    width: auto;
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    justify-content: ${props => props.isMyMessage === true ? "flex-end" : "flex-sart"}
`;

export default WaitChat;