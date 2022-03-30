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
    const isWhite = true;

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
                    <div className="player__thumbnail__box" leftPlayer>
                        <PlayerThumbnail profileImage={blackPlayer.profileImage} />
                        <div>
                            <Text is_color="white">{blackPlayer?.id}</Text>
                        </div>
                    </div>
                    <div className="player__info__box" style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text is_bold="800" is_size="17px" is_line_height="19px" width="100%" is_margin="0 0 10px 0">
                                Point {blackPlayer?.point}p
                            </Text>
                            <Progress win={blackPlayer.score[0]?.win} lose={blackPlayer.score[1]?.lose} width="100%" margin="0 0 10px 0" />
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
                    <div className="player__thumbnail__box" leftPlayer>
                        <div style={{ width: "70px", height: "70px" }}>
                        </div>
                    </div>
                </PlayerCard>
            }

            {whitePlayer &&
                whitePlayer?.hasOwnProperty('id')
                ?
                <PlayerCard isWhite>
                    <div className="player__thumbnail__box">
                        <PlayerThumbnail profileImage={whitePlayer.profileImage} />
                        <div>
                            <Text>{whitePlayer?.id}</Text>
                        </div>
                    </div>
                    <div className="player__info__box" style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text is_bold="800" is_size="17px" is_line_height="19px" is_margin="0 0 10px 0">
                                Point {whitePlayer?.point}p
                            </Text>
                            <Progress win={whitePlayer.score[0]?.win} lose={whitePlayer.score[1]?.lose} width="100%" margin="0 0 10px 0" />
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
                <PlayerCard onClick={ChangeToWhitePlayer}>
                    <div className="player__thumbnail__box">
                        <div style={{ width: "70px", height: "70px" }}>
                        </div>
                    </div>
                </PlayerCard>
            }
        </PlayerContainer>
    )
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    /* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  /* ... */
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  /* ... */
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  /* ... */
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    justify-content: space-between;
}
`

const PlayerCard = styled.div`
    width: 384px;
    height: 130px;
    margin: ${props => props.leftPlayer ? "0 12px 0 0" : "0 0 0 12px"};
    outline: 2px solid black;
    box-shadow: -3px 3px 6px 3px #A8937340;
    border-radius: 14px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    .player__thumbnail__box{
        padding: 20px;
        border-right: 2px solid #000;
        background-color: ${props => props.leftPlayer ? "#5B5B5B" : ""};
    }

    &:hover {
        outline: 4px solid #94D7BB;
    }
`
const PlayerThumbnail = styled.div`
    width: 70px;
    height: 70px;
    margin: 0 0 6px 0;
    border-radius: 50%;
    background-image: ${props => props.profileImage ? `url(${props.profileImage})` : ''};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

export default WaitPlayerList;