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
                <>
                    <WaitingContainer>
                        <div className="container_left">
                            <WaitingUsers socket={currentSocket} roomNum={roomNum} />
                        </div>
                        <div className="container_right">
                            <WaitChat socket={currentSocket} roomNum={roomNum} />
                        </div>
                    </WaitingContainer>
                </>
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
    align-items: center;
    box-sizing: border-box;
    background: #C4C4C4;
    padding: 40px;
    overflow: hidden;
    
    >div:nth-child(1) {
        margin-top: 20px;
        margin-bottom: 20px;
        margin-right: 23px;
        height: auto;
    }

    >div:nth-child(2){
        /* width: 25%; */
        height: auto;
        /* padding: 20px 0 20px 23px; */
    }
`


export default Waiting;