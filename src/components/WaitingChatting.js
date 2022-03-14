import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import Input from '../elements/Input';
import Text from '../elements/Text';
import WaitOneChat from './WaitOneChat';
import WaitChatInput from './WaitChatInput';


function WaitingChatting(props) {
    console.log("이 채팅창은 몇 번 실행될까요?")
    const { socket } = props;
    const scrollRef = useRef();

    const userId = localStorage.getItem('userId');

    return (
        <>
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
                {/* {
                    content.length > 0 ?
                        <div className="user-message" style={{ textAlign: "center" }}>
                            <span>{content}</span>
                        </div>
                        :
                        null
                } */}
                <div className="chat-body" style={{ width: "100%", height: "100%", overflowX: "hidden" }} ref={scrollRef}>
                    <WaitOneChat socket={socket} />
                </div>

                <div className="chat-footer"
                    style={{
                        height: "40px",
                        border: "1px solid #263238",
                        borderTop: "none",
                        display: "flex",
                    }}>
                    <WaitChatInput socket={socket} />


                    {/* <Button
                        _onClick={handleEnter}
                        is_width="30%"
                    >
                        &#9658;
                    </Button> */}
                </div>
            </ChattingWindow>
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

const ChattingHeader = styled.div`
    height: 45px;
    border-radius: 5px;
    background: #263238;
    cursor: pointer;
    margin-top: 0;
`



export default WaitingChatting;