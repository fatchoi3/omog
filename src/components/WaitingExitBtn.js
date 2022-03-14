import React from 'react';
import { history } from '../redux/configureStore';
import io from "socket.io-client";

function WaitingExitBtn({ socket }) {
    const goodbyeWait = async () => {
        await socket.once("bye", userId => {
            console.log(userId)
        })
        socket.disconnect();
        history.push('/main');
    }

    return (
        <button onClick={goodbyeWait}>나가기 버튼</button>
    );
}

export default WaitingExitBtn;