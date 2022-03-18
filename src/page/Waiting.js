import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import io from "socket.io-client";

import WaitChat from '../components/Wait/WaitChat';
import WaitingUsers from '../components/Wait/WaitingUsers';


function Waiting(props) {
    console.log("해당 페이지 최상단 페이지입니다.")
    const { roomNum } = useParams();

    const [currentSocket, setCurrentSocket] = useState();

    useEffect(() => {
        console.log("최상단 페이지 useEffec는 몇 번 될까요?")
        setCurrentSocket(io("http://15.165.158.25/waiting"));

    }, []);

    return (
        <>
            {currentSocket ?
                <WaitingContainer>
                    <div className="container_left" style={{ padding: "20px" }}>
                        <WaitingUsers socket={currentSocket} roomNum={roomNum} />
                    </div>

                    <div className="container_right" style={{ width: "25%", padding: "20px" }}>
                        <WaitChat socket={currentSocket} roomNum={roomNum} />
                    </div>
                </WaitingContainer>
                :
                <div>로딩중</div>
            }
        </>
    );
}

const WaitingContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    background: #C4C4C4;
    padding: 5%;
`


export default Waiting;