import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import WaitingChatting from '../components/WaitingChatting';

function Waiting(props) {




    return (
        <div className="main_container" style={{ display: "flex", justifyContent: "center" }}>
            <div className="container_left">
                <div className="player_container" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="player_box" style={{ textAlign: "center" }}>
                        <PlayerCard>
                            <PlayerThumbnail />
                        </PlayerCard>
                    </div>
                    <div className="player_box" style={{ textAlign: "center" }}>
                        <PlayerCard>
                            <PlayerThumbnail />
                        </PlayerCard>
                    </div>
                </div>
                <div className="button_box" style={{ textAlign: "center" }}>
                    <Button is_width="10px" is_border="1px solid pink">버튼</Button>
                </div>
                <div className="observer_container" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="observer_box" style={{ textAlign: "center" }}>
                        <ObserverCard></ObserverCard>
                        <Button is_width="10px" is_border="1px solid pink">버튼</Button>
                    </div>
                    <div className="observer_box" style={{ textAlign: "center" }}>
                        <ObserverCard></ObserverCard>
                        <Button is_width="10px" is_border="1px solid pink">버튼</Button>
                    </div>
                </div>
            </div>
            <div className="container_right" style={{ padding: "20px" }}>
                <WaitingChatting />
            </div>
        </div>
    );
}

const PlayerCard = styled.div`

`

const PlayerThumbnail = styled.img`
    // width: 100%;
    width: 200px;
    height: 100px;
    position: relative;
    padding-top: 75%;
    border: 1px solid red;

    img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
        border: 1px solid black;
        object-fit: cover;
    }
`

const ObserverCard = styled.div`
    width: 200px;
    height: 100%;
    border: 1px solid blue;
`

export default Waiting;