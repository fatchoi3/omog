import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Text } from '../elements';
import Table from '../components/Table';

import { actionCreators as gameActions } from '../redux/modules/game';




function Result(props) {
    const dispatch = useDispatch();
    const { gameNum } = useParams();
    const [info, setInfo] = useState();


    const columns = useMemo(
        () => [
            {
                accessor: "id",
                Header: "아이디",
            },
            {
                accessor: "usePoint",
                Header: "사용한 포인트",
            },
            {
                accessor: "getPoint",
                Header: "획득한 포인트",
            },
            {
                accessor: "score",
                Header: "총 포인트",
            },
        ],
        []
    );



    useEffect(() => {
        const gamessss = {
            id: "user1",
            gameNum: 1,
            result: { win: "user1" }
        }
        dispatch(gameActions.getGameResultDB(gamessss));
    }, [])

    const resultgame = {
        userInfo: [
            {
                id: "아이디1",
                score: 1234,
                usePoint: 300,
                getPoint: 400,
                state: "player",
            },
            {
                id: "아이디2",
                score: 1234,
                usePoint: 300,
                getPoint: 400,
                state: "player",
            },
            {
                id: "아이디3",
                score: 1234,
                usePoint: 300,
                getPoint: 400,
                state: "observer",
            },
            {
                id: "아이디4",
                score: 1234,
                usePoint: 300,
                getPoint: 400,
                state: "observer",
            },
        ],
        gameInfo: {
            blackTeamPlayer: "id1",
            blackTeamObserver: ["a", "b", "c", "d"],
            whiteTeamPlayer: "id2",
            whiteTeamObserver: ["a", "b", "c", "d"]
        },
        result: { win: "이긴 사람 아이디" }
    }

    const data = useMemo(() => [...resultgame.userInfo], [resultgame.userInfo])

    return (
        <div className="result-container" style={{ margin: "100px auto", width: "600px", height: "600px", border: "1px solid red" }}>
            <GameResult>
                <Text>{resultgame.result.win} 님이 승리하였습니다!</Text>
            </GameResult>

            <Table columns={columns} data={data} />
        </div>
    );
}

const GameResult = styled.div`
    width: 300px;
    height: 50px;
    margin: 0 auto;
    border: 1px solid pink;
    text-align: center;
`

const ObserverResult = styled.div`

`

export default Result;