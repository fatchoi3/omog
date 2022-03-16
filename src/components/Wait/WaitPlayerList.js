import React from 'react';
import styled from 'styled-components';
import Text from '../../elements/Text';

function WaitPlayerList({ blackPlayer, whitePlayer }) {
    console.log(blackPlayer, whitePlayer)

    return (
        <PlayerContainer>
            <div className="black-player-box" style={{ display: "flex", textAlign: "center", width: "100%" }}>
                <BlackPlayerCard>
                    <Text>아이디: {blackPlayer?.id}</Text>
                    <Text>승률:
                        {blackPlayer?.score
                            ?
                            blackPlayer?.score[0].win === 0
                                ?
                                0
                                :
                                (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                            :
                            null
                        }
                    </Text>
                    <Text>
                        포인트 : {blackPlayer?.point}
                    </Text>
                </BlackPlayerCard>
                <WhitePlayerCard>
                    <Text>아이디: {whitePlayer?.id}</Text>
                    <Text>승률:
                        {whitePlayer?.score
                            ?
                            whitePlayer?.score[0].win === 0
                                ?
                                0
                                :
                                (whitePlayer?.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)
                            :
                            null
                        }
                    </Text>
                    <Text>
                        포인트 : {whitePlayer?.point}
                    </Text>
                </WhitePlayerCard>
            </div>
        </PlayerContainer>
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

export default React.memo(WaitPlayerList);