import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Text from '../../elements/Text';

import { actionCreators as roomActions } from '../../redux/modules/room';


function WaitPlayerList({ roomNum, socket, blackPlayer, whitePlayer }) {
    const dispatch = useDispatch();
    const waitingPerson = useSelector((state) => state.room.userInfo);

    // const blackPlayer = useSelector(state => state.room.blackPlayer);
    // const whitePlayer = useSelector(state => state.room.whitePlayer);

    console.log(blackPlayer, whitePlayer)
    console.log(blackPlayer?.hasOwnProperty('id'), whitePlayer?.hasOwnProperty('id'))

    const ChangeToBlackPlayer = (e) => {
        e.preventDefault();
        // dispatch(roomActions.changeUserInfo("blackPlayer"))
        socket.emit("changeToPlayer", roomNum, waitingPerson.state, "blackPlayer");
        console.log(waitingPerson.state, "blackPlayer로 변경");
    };

    const ChangeToWhitePlayer = (e) => {
        e.preventDefault();
        // dispatch(roomActions.changeUserInfo("whitePlayer"))
        socket.emit("changeToPlayer", roomNum, waitingPerson.state, "whitePlayer");
        console.log(waitingPerson.state, "whitePlayer로 변경");
    };


    return (
        <PlayerContainer>
            {blackPlayer &&
                blackPlayer?.hasOwnProperty('id')
                ?
                <BlackPlayerCard>
                    <div style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ marginRight: "31px", boxSizing: "border-box" }}>
                            <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#D3D3D3", margin: "0 0 6px 0" }}>
                            </div>
                            <div>
                                <Text>{blackPlayer?.id}</Text>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text is_bold="800" is_size="17px" is_line_height="19px" is_margin="0 0 16px 0">
                                Point {blackPlayer?.point}p
                            </Text>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "219px" }}>
                                <Text is_bold="600">
                                    {/* 승률:
                                    {blackPlayer?.score
                                        ?
                                        blackPlayer?.score[0]?.win === 0
                                            ?
                                            0
                                            :
                                            (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                        :
                                        null
                                    }% */}
                                </Text>
                                <Text is_size="14px">
                                    {/* (전체 &nbsp;
                                    {blackPlayer?.score
                                        ?
                                        blackPlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                        :
                                        null
                                    }승 &nbsp;
                                    {blackPlayer?.score
                                        ?
                                        blackPlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                        :
                                        null
                                    }패
                                    ) */}
                                </Text>
                            </div>
                        </div>
                    </div>
                </BlackPlayerCard>
                :
                <BlackPlayerCard onClick={ChangeToBlackPlayer}>
                    <div style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ marginRight: "31px", boxSizing: "border-box" }}>
                            <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#D3D3D3", margin: "0 0 6px 0" }}>
                            </div>
                            <div>
                                <Text>{blackPlayer?.id}</Text>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text is_bold="800" is_size="17px" is_line_height="19px" is_margin="0 0 16px 0">
                                Point {blackPlayer?.point}p
                            </Text>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "219px" }}>
                                <Text is_bold="600">
                                    승률:
                                    {blackPlayer?.score
                                        ?
                                        blackPlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                        :
                                        null
                                    }%
                                </Text>
                                <Text is_size="14px">
                                    (전체 &nbsp;
                                    {blackPlayer?.score
                                        ?
                                        blackPlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                        :
                                        null
                                    }승 &nbsp;
                                    {blackPlayer?.score
                                        ?
                                        blackPlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                        :
                                        null
                                    }패
                                    )
                                </Text>
                            </div>
                        </div>
                    </div>
                </BlackPlayerCard>
            }

            {whitePlayer &&
                whitePlayer?.hasOwnProperty('id')
                ?
                <WhitePlayerCard>
                    <div style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ marginRight: "31px", boxSizing: "border-box" }}>
                            <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#D3D3D3", margin: "0 0 6px 0" }}>
                            </div>
                            <div>
                                <Text>{whitePlayer?.id}</Text>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text is_bold="800" is_size="17px" is_line_height="19px" is_margin="0 0 16px 0">
                                Point {whitePlayer?.point}p
                            </Text>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "219px" }}>
                                <Text is_bold="600">
                                    승률:
                                    {whitePlayer?.score
                                        ?
                                        whitePlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (whitePlayer?.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)
                                        :
                                        null
                                    }%
                                </Text>
                                <Text is_size="14px">
                                    (전체 &nbsp;
                                    {whitePlayer?.score
                                        ?
                                        whitePlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (whitePlayer?.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)
                                        :
                                        null
                                    }승 &nbsp;
                                    {whitePlayer?.score
                                        ?
                                        whitePlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (whitePlayer?.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)
                                        :
                                        null
                                    }패
                                    )
                                </Text>
                            </div>
                        </div>
                    </div>
                </WhitePlayerCard>
                :
                <WhitePlayerCard onClick={ChangeToWhitePlayer}>
                    <div style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ marginRight: "31px", boxSizing: "border-box" }}>
                            <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#D3D3D3", margin: "0 0 6px 0" }}>
                            </div>
                            <div>
                                <Text>{whitePlayer?.id}</Text>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text is_bold="800" is_size="17px" is_line_height="19px" is_margin="0 0 16px 0">
                                Point {whitePlayer?.point}p
                            </Text>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "219px" }}>
                                <Text is_bold="600">
                                    승률:
                                    {whitePlayer?.score
                                        ?
                                        whitePlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (whitePlayer?.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)
                                        :
                                        null
                                    }%
                                </Text>
                                <Text is_size="14px">
                                    (전체 &nbsp;
                                    {whitePlayer?.score
                                        ?
                                        whitePlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (whitePlayer?.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)
                                        :
                                        null
                                    }승 &nbsp;
                                    {whitePlayer?.score
                                        ?
                                        whitePlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            (whitePlayer?.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)
                                        :
                                        null
                                    }패
                                    )
                                </Text>
                            </div>
                        </div>
                    </div>
                </WhitePlayerCard>
            }
        </PlayerContainer>
    )
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const BlackPlayerCard = styled.div`
    width: 367px;
    height: 130px;
    border: 2px solid black;
    box-shadow: -3px 3px 6px 3px #A8937340;
    border-radius: 14px;
    margin-right: 18px;
    box-sizing: border-box;
    background: white;

    &:hover {
        outline: 4px solid #94D7BB;
    }
`

const WhitePlayerCard = styled.div`
    width: 367px;
    height: 130px;
    border: 2px solid black;
    box-shadow: -3px 3px 6px 3px #A8937340;
    border-radius: 14px;
    margin-left: 18px;
    box-sizing: border-box;
    background: white;

    &:hover {
        outline: 4px solid #94D7BB;
    }
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