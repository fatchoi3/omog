import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";

import WaitChat from '../components/Wait/WaitChat';
import WaitingUsers from '../components/Wait/WaitingUsers';


function Waiting(props) {
    console.log("해당 페이지 최상단 페이지입니다.")
    const { roomNum } = useParams();

    const [currentSocket, setCurrentSocket] = useState();

    useEffect(() => {
        console.log("최상단 페이지 useEffec는 몇 번 될까요?")
        setCurrentSocket(io("http://15.164.103.116/waiting"));
    }, []);

    return (
        <>
            {currentSocket ?
                <div className="main_container" style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
                    <div className="container_left" style={{ padding: "20px" }}>
                        <WaitingUsers socket={currentSocket} roomNum={roomNum} />
                    </div>

                    <div className="container_right" style={{ padding: "20px" }}>
                        <WaitChat socket={currentSocket} roomNum={roomNum} />
                    </div>
                </div >
                :
                <div>로딩중</div>
            }
        </>
    );
}


export default Waiting;