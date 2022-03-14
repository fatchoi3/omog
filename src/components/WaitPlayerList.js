import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../elements/Text';

function WaitPlayerList(props) {
    // const waitingPlayerState = useSelector((state) => state.room.userInfo);
    const waitingPlayer = useSelector((state) => state.room.userInfo);


    if (waitingPlayer.state !== "blackPlayer" && waitingPlayer.state !== "whitePlayer") {
        return (
            <>
                <PlayerContainer>
                    <div className="white-player-box" style={{ display: "flex", textAlign: "center", width: "100%" }}>
                        <BlackPlayerCard>
                            <Text>아이디: </Text>
                            <Text>승률 : </Text>
                            <Text>point : </Text>
                        </BlackPlayerCard>
                        <WhitePlayerCard>
                            <Text>아이디: </Text>
                            <Text>승률 : </Text>
                            <Text>point : </Text>
                        </WhitePlayerCard>
                    </div>
                </PlayerContainer>
            </>
        )
    }


    return (
        <>
            {
                waitingPlayer.state === "blackPlayer"
                    ?
                    <PlayerContainer>
                        <div className="black-player-box" style={{ display: "flex", textAlign: "center", width: "100%" }}>
                            <BlackPlayerCard>
                                <Text>아이디: {waitingPlayer.id}</Text>
                                {/* <Text>승률:
                                    {waitingPlayer.score[0]
                                        ?
                                        waitingPlayer.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (waitingPlayer.score[0].win) / (waitingPlayer.score[0].win + waitingPlayer.score[1].lose)
                                        :
                                        0
                                    }
                                </Text> */}
                                <Text>승률: </Text>
                                {/* <Text>
                                    포인트 : {waitingPlayer.point}
                                </Text> */}
                                <Text>포인트: </Text>
                            </BlackPlayerCard>
                            <WhitePlayerCard>
                                <Text>아이디: </Text>
                                <Text>승률 : </Text>
                                <Text>point : </Text>
                            </WhitePlayerCard>
                        </div>
                    </PlayerContainer>

                    :

                    <PlayerContainer>
                        <div className="white-player-box" style={{ display: "flex", textAlign: "center", width: "100%" }}>
                            <BlackPlayerCard>
                                <Text>아이디: </Text>
                                <Text>승률 : </Text>
                                <Text>point : </Text>
                            </BlackPlayerCard>
                            <WhitePlayerCard>
                                <Text>아이디: {waitingPlayer.id}</Text>
                                {/* <Text>승률:
                                    {waitingPlayer.score[0]
                                        ?
                                        waitingPlayer.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (waitingPlayer.score[0].win) / (waitingPlayer.score[0].win + waitingPlayer.score[1].lose)
                                        :
                                        0
                                    }
                                </Text> */}
                                <Text>승률: </Text>
                                {/* <Text>
                                    포인트 : {waitingPlayer.point}
                                </Text> */}
                                <Text>포인트: </Text>
                            </WhitePlayerCard>
                        </div>
                    </PlayerContainer>
            }
        </>
    )
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const BlackPlayerCard = styled.div`
    width: 100%;
    border: 1px solid red;
    color: white;
    background-color: black;
`

const WhitePlayerCard = styled.div`
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

export default WaitPlayerList;