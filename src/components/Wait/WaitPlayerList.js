import React, { useCallback } from 'react';
import styled from 'styled-components';
import Text from '../../elements/Text';
import Progress from '../Progress';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../../redux/modules/room';


function WaitPlayerList({ roomNum, socket }) {
    console.log("플레이어 컴포넌트입니다.");
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId")
    const waitingPerson = useSelector((state) => state.room.userInfo);

    const blackPlayer = useSelector(state => state.room.blackPlayer);
    const whitePlayer = useSelector(state => state.room.whitePlayer);

    console.log(blackPlayer, whitePlayer)
    console.log(blackPlayer?.hasOwnProperty('id'), whitePlayer?.hasOwnProperty('id'))


    const ChangeToBlackPlayer = useCallback((e) => {
        e.preventDefault();
        if (userId === waitingPerson.id) {
            dispatch(roomActions.changeUserInfo(userId, waitingPerson.id, "blackPlayer"))
            const data = { roomNum: roomNum, previousTeam: waitingPerson.state, wantTeam: "blackPlayer" }
            socket.emit("changeToPlayer", data);
            console.log(waitingPerson.state, "blackPlayer로 변경");
        }
    }, [waitingPerson.state])

    const ChangeToWhitePlayer = useCallback((e) => {
        e.preventDefault();
        if (userId === waitingPerson.id) {
            dispatch(roomActions.changeUserInfo(userId, waitingPerson.id, "whitePlayer"))
            const data = { roomNum: roomNum, previousTeam: waitingPerson.state, wantTeam: "whitePlayer" }
            socket.emit("changeToPlayer", data);
            console.log(waitingPerson.state, "whitePlayer로 변경");
        }
    }, [waitingPerson.state])


    return (
        <PlayerContainer>
            {blackPlayer &&
                blackPlayer?.hasOwnProperty('id')
                ?
                <PlayerCard leftPlayer>
                    <div style={{ padding: "21px 13px", boxSizing: "border-box", borderRight: "1px solid #AFADAD", backgroundColor: "#5B5B5B" }}>
                        <PlayerThumbnail profileImage={blackPlayer.profileImage} />
                        {/* <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#D3D3D3", margin: "0 0 6px 0" }}>
                        </div> */}
                        <div>
                            <Text is_color="white">{blackPlayer?.id}</Text>
                        </div>
                    </div>
                    <div style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text is_bold="800" is_size="17px" is_line_height="19px" width="100%" is_margin="0 0 10px 0">
                                Point {blackPlayer?.point}p
                            </Text>
                            <Progress win={blackPlayer.score[0].win} lose={blackPlayer.score[1].lose} width="100%" margin="0 0 10px 0" />
                            <div style={{ display: "flex", justifyContent: "space-between", width: "219px" }}>
                                <Text is_bold="600">
                                    승률:
                                    {blackPlayer?.score
                                        ?
                                        blackPlayer?.score[0]?.win === 0
                                            ?
                                            0
                                            :
                                            Math.ceil(((blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)) * 100)
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
                                            (blackPlayer?.score[0].win)
                                        :
                                        null
                                    }승 &nbsp;
                                    {blackPlayer?.score
                                        ?
                                        blackPlayer.score[1].lose
                                        :
                                        null
                                    }패)
                                </Text>
                            </div>
                        </div>
                    </div>
                </PlayerCard>
                :
                <PlayerCard leftPlayer onClick={ChangeToBlackPlayer}>
                    <div style={{ padding: "21px 13px", boxSizing: "border-box", borderRight: "1px solid #AFADAD", backgroundColor: "#5B5B5B" }}>
                        <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#5B5B5B", margin: "0 0 6px 0" }}>
                        </div>
                        <div>
                        </div>
                    </div>
                </PlayerCard>
            }

            {whitePlayer &&
                whitePlayer?.hasOwnProperty('id')
                ?
                <PlayerCard isWhite>
                    <div style={{ padding: "13px", boxSizing: "border-box", borderRight: "1px solid #AFADAD" }}>
                        <PlayerThumbnail profileImage={whitePlayer.profileImage} />
                        <div>
                            <Text>{whitePlayer?.id}</Text>
                        </div>
                    </div>
                    <div style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text is_bold="800" is_size="17px" is_line_height="19px" is_margin="0 0 10px 0">
                                Point {whitePlayer?.point}p
                            </Text>
                            <Progress win={whitePlayer.score[0].win} lose={whitePlayer.score[1].lose} width="100%" margin="0 0 10px 0" />
                            <div style={{ display: "flex", justifyContent: "space-between", width: "219px" }}>
                                <Text is_bold="600">
                                    승률:
                                    {whitePlayer?.score
                                        ?
                                        whitePlayer?.score[0].win === 0
                                            ?
                                            0
                                            :
                                            Math.ceil(((whitePlayer?.score[0].win) / (whitePlayer.score[0].win + whitePlayer.score[1].lose)) * 100)
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
                                            (whitePlayer?.score[0].win)
                                        :
                                        null
                                    }승 &nbsp;
                                    {whitePlayer?.score
                                        ?
                                        whitePlayer.score[1].lose
                                        :
                                        null
                                    }패)
                                </Text>
                            </div>
                        </div>
                    </div>
                </PlayerCard>
                :
                <PlayerCard onClick={ChangeToWhitePlayer} />
            }
        </PlayerContainer>
    )
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
`

const PlayerCard = styled.div`
    width: 367px;
    height: 130px;
    margin: ${props => props.leftPlayer ? "0 9px 0 0" : "0 0 0 9px"};
    padding: ${props => props.isWhite ? "8px 0" : 0};
    /* border: 2px solid black; */
    outline: 2px solid black;
    box-shadow: -3px 3px 6px 3px #A8937340;
    border-radius: 14px;
    box-sizing: border-box;
    background: white;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    &:hover {
        outline: 4px solid #94D7BB;
    }
`
const PlayerThumbnail = styled.div`
    // width: 100%;
    width: 70px;
    height: 70px;
    margin: 0 0 6px 0;
    border-radius: 50%;
    background-image: ${props => props.profileImage ? `url(${props.profileImage})` : ''};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
/* 
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
    } */
`

export default WaitPlayerList;