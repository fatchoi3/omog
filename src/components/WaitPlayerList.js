import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../elements/Text';

function WaitPlayerList(props) {
    const get_user = useSelector((state) => state.room.user);
    const blackPlayer = useSelector((state) => state.room.blackPlayer);
    const whitePlayer = useSelector((state) => state.room.whitePlayer);


    return (
        <div className="player_container" style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="white_player_box" style={{ textAlign: "center", width: "100%" }}>
                {
                    "id" in whitePlayer
                        ?
                        <PlayerCard>
                            <Text>아이디: {whitePlayer.id}</Text>
                            <Text>승률 :
                                {whitePlayer.score[0]
                                    ?
                                    whitePlayer.score[0].win === 0
                                        ?
                                        0
                                        :
                                        (whitePlayer.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)
                                    :
                                    0
                                }
                            </Text>
                            <Text>point : {whitePlayer.point}</Text>
                            {/* <PlayerThumbnail /> */}
                        </PlayerCard>
                        :
                        <PlayerCard>
                            <Text>아이디: </Text>
                            <Text>승률 : </Text>
                            <Text>point : </Text>
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
                {
                    "id" in blackPlayer
                        ?
                        <PlayerCard>
                            <Text>아이디: {blackPlayer.id}</Text>
                            <Text>승률 :
                                {blackPlayer.score[0]
                                    ?
                                    blackPlayer.score[0].win === 0
                                        ?
                                        0
                                        :
                                        (blackPlayer.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                    :
                                    0
                                }
                            </Text>
                            <Text>point : {blackPlayer.point}</Text>
                            {/* <PlayerThumbnail /> */}
                        </PlayerCard>
                        :
                        <PlayerCard>
                            <Text>아이디: </Text>
                            <Text>승률 : </Text>
                            <Text>point : </Text>
                            {/* <PlayerThumbnail /> */}
                        </PlayerCard>
                }
            </div>
        </div>
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

export default WaitPlayerList;