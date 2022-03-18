import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Text, Button } from '../elements';
import ResultMainTable from '../components/ResultMainTable';
import ResultPointTable from '../components/ResultPointTable';

import { actionCreators as gameActions } from '../redux/modules/game';


function Result(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { roomNum } = useParams();
    const { gameNum } = useParams();

    const main_columns = useMemo(
        () => [
            {
                accessor: "id",
                Header: "아이디",
            },
            {
                accessor: "usePoint",
                Header: "승리팀",
            },
            {
                accessor: "getPoint",
                Header: "훈수 포인트",
            },
        ],
        []
    );

    const point_columns = useMemo(
        () => [
            {
                accessor: "score",
                Header: "총 포인트"
            }
        ], []
    )

    const exitResult = () => {
        history.push(`/main`);
    }

    useEffect(() => {
        dispatch(gameActions.getGameResultDB());
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
        <div className="result-container" style={{ margin: "100px auto", width: "60%" }}>
            <GameResult>
                {/* {resultgame.result.win} 님이 승리하였습니다! */}
                <Text is_size="150px" is_weight="900" is_line_height="180px">승리</Text>
            </GameResult>
            <div style={{ display: "flex", width: "100%" }}>
                <ResultMainTable columns={main_columns} data={data} />
                <ResultPointTable columns={point_columns} data={data} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button is_width="8rem" is_margin="0 4px 0 0" is_padding="5px 10px" is_size="25px"
                    is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                >
                    계속하기
                </Button>
                <Button is_width="8rem" is_margin="0 0 0 4px" is_padding="5px 10px" is_size="25px"
                    is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                    _onClick={exitResult}
                >
                    나가기
                </Button>
            </div>
        </div>
    );
}

const GameResult = styled.div`
    width: 100%;
    margin: 0 auto;
    // border: 1px solid pink;
    text-align: center;
`

const ObserverResult = styled.div`

`

export default Result;