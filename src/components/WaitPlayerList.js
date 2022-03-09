import React from 'react';
import styled from 'styled-components';

import Text from '../elements/Text';

function WaitPlayerList(props) {
    const { blackPlayer, whitePlayer } = props
    return (
        <div className="player_container" style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="white_player_box" style={{ textAlign: "center", width: "100%" }}>
                {whitePlayer
                    ?
                    <PlayerCard>
                        <Text>아이디: {whitePlayer.id}</Text>
                        <Text>승률 : {whitePlayer.score}</Text>
                        <Text>point : {whitePlayer.point}</Text>
                        {/* <PlayerThumbnail /> */}
                    </PlayerCard>
                    :
                    <PlayerCard>
                        <Text>아이디: {whitePlayer.id}</Text>
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
                        <Text>아이디: {blackPlayer.id}</Text>
                        <Text>승률 : {blackPlayer.score}</Text>
                        <Text>point : {blackPlayer.point}</Text>
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