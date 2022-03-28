import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import io from "socket.io-client";

import WaitChat from '../components/Wait/WaitChat';
import WaitingUsers from '../components/Wait/WaitingUsers';
import Spinner from '../elements/Spinner';


function Waiting(props) {
    const { roomNum } = useParams();
    const [currentSocket, setCurrentSocket] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setCurrentSocket(io("https://haksae90.shop/waiting"));
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => {
            setLoading(false)
        }, 800)
    }, []);

    return (
        <>
            {loading ? (<Spinner type={'page'} is_dim={true} width="200px" />) : ""}
            {currentSocket ?
                <WaitingContainer>
                    <div className="container_left">
                        <WaitingUsers socket={currentSocket} roomNum={roomNum} />
                    </div>

                    <div className="container_right">
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
    
    >div:nth-child(1) {
        padding: 20px;
    }

    >div:nth-child(2){
        width: 25%;
        padding: 20px;
    }
`


export default Waiting;