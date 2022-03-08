import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import WaitingChatting from '../components/WaitingChatting';
import Text from '../elements/Text';

// http://15.164.103.116/
// http://localhost:3001

const socket = io.connect("http://localhost:4001");



function Waiting(props) {
    const { socket } = props;
    const [blackPlayer, setBlackPlayer] = React.useState({ id: "흑돌", score: "50%", point: 1023 });
    const [whitePlayer, setWhitePlayer] = React.useState({});

    const [blackObserverList, setBlackObserverList] = React.useState([
        {
            id: "아이디1",
            score: 150,
            point: 1000,
            state: "observer",
        },
        {
            id: "아이디2",
            score: 170,
            point: 1000,
            state: "observer",
        },
        {
            id: "아이디3",
            score: 200,
            point: 1400,
            state: "observer",
        }
    ]);
    const [whiteObserverList, setWhiteObserverList] = React.useState([
        {
            id: "아이디1",
            score: 150,
            point: 1000,
            state: "observer",
        },
        {
            id: "아이디2",
            score: 170,
            point: 1000,
            state: "observer",
        },
        {
            id: "아이디3",
            score: 200,
            point: 1400,
            state: "observer",
        }
    ]);


    const id = "아이디1";
    const state = "Aplayer";
    const roomNum = "123";

    const localId = "아이디1";
    const me = id === localId ? true : false;
    console.log(me)

    useEffect(() => {
        if (!socket) return;

        socket.on("connection", () => {
            console.log("연결되었습니다.")
        });

        socket.emit("nickname", id);
        console.log("닉네임을 보냈습니다.");

        socket.emit("enterRoomPlayer", roomNum);
        console.log("플레이어 정보를 보냈습니다.");


        socket.on("welcome", (id, userInfo) => {
            console.log("welcome 실행완료", id, userInfo)
            if (userInfo.state === "player") {
                setWhitePlayer(userInfo)
            } else if (userInfo.state === "Bplayer") {
                setBlackPlayer(userInfo)
            } else if (userInfo.state === "AObserver") {
                setWhiteObserverList([...whiteObserverList, userInfo])
            } else {
                setBlackObserverList([...blackObserverList, userInfo])
            }
        });

    }, [socket])

    const handleChangeState = () => {
        socket.emit("changeToPlayer", "player")
    }

    return (
        <div className="main_container" style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
            <div className="container_left" style={{ padding: "20px" }}>
                <div className="player_container" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="white_player_box" style={{ textAlign: "center", width: "100%" }}>
                        {whitePlayer &&
                            <PlayerCard>
                                <Text>{whitePlayer.id}</Text>
                                <Text>승률 : {whitePlayer.score}</Text>
                                <Text>point : {whitePlayer.point}</Text>
                                {/* <PlayerThumbnail /> */}
                            </PlayerCard>
                        }
                    </div>
                    <div
                        className="black_player_box"
                        style={{
                            textAlign: "center",
                            width: "100%", color: "white",
                            backgroundColor: "black"
                        }}>
                        {blackPlayer &&
                            <PlayerCard>
                                <Text>{blackPlayer.id}</Text>
                                <Text>승률 : {blackPlayer.score}</Text>
                                <Text>point : {blackPlayer.point}</Text>
                                {/* <PlayerThumbnail /> */}
                            </PlayerCard>
                        }
                    </div>
                </div>
                <div className="button_box" style={{ textAlign: "center" }}>
                    <Button is_width="10px" is_border="1px solid pink" _onClick={handleChangeState}>버튼</Button>
                </div>
                <ObserverContainer>
                    <div className="white_observer_box" style={{ textAlign: "center" }}>
                        <ObserverCard>
                            {whiteObserverList &&
                                whiteObserverList.map((observer, idx) => (
                                    <Text key={idx}>{observer.id}</Text>
                                ))}
                        </ObserverCard>
                        <Button is_width="10px" is_border="1px solid pink">버튼</Button>
                    </div>
                    <div className="black_observer_box" style={{ textAlign: "center", backgroundColor: "black" }}>
                        <ObserverCard>
                            {blackObserverList &&
                                blackObserverList.map((observer, idx) => (
                                    <Text key={idx} is_color="white">{observer.id}</Text>
                                ))}
                        </ObserverCard>
                        <Button is_width="10px" is_border="1px solid pink">버튼</Button>
                    </div>
                </ObserverContainer>
            </div>
            <div className="container_right" style={{ padding: "20px" }}>
                <WaitingChatting
                    socket={socket}
                    blackPlayer={blackPlayer}
                    whitePlayer={whitePlayer}
                    blackObserverList={blackObserverList}
                    whiteObserverList={whiteObserverList}
                    me={me}
                />
            </div>
        </div >
    );
}

const PlayerCard = styled.div`
    width: 100%;
    border: 1px solid red;
`

// const PlayerThumbnail = styled.img`
//     // width: 100%;
//     width: 200px;
//     height: 100px;
//     position: relative;
//     padding-top: 75%;

//     img {
//         position: absolute;
//         top: 0px;
//         left: 0px;
//         width: 100%;
//         height: 100%;
//         display: block;
//         border-radius: 50%;
//         border: 1px solid black;
//         object-fit: cover;
//     }
// `

const ObserverContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const ObserverCard = styled.div`
    width: 200px;
    height: 100%;
    border: 1px solid blue;
`

export default Waiting;