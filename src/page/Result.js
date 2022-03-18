import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Text, Button } from '../elements';
import ResultWinMainTable from '../components/Result/ResultWinMainTable';
import ResultWinPointTable from '../components/Result/ResultWinPointTable';
import ResultLoseMainTable from '../components/Result/ResultLoseMainTable';
import ResultLosePointTable from '../components/Result/ResultLosePointTable';

import { actionCreators as gameActions } from '../redux/modules/game';


function Result(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const result = useSelector(state => state.game.result);
    console.log(result);
    const getGameResult = useSelector(state => state.game.gameresult);
    console.log(getGameResult);
    const userId = localStorage.getItem('userId');

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
                accessor: "totalPoint",
                Header: "총 포인트"
            }
        ], []
    )

    const exitResult = () => {
        history.push(`/main`);
    }

    useEffect(() => {
        if (result) {
            dispatch(gameActions.getGameResultDB(userId, result.gameNum, result.result));
        }
    }, [result])



    // {
    //     win:[
    //         {
    //          id : “user1"
    //          usePoint : 사용한 포인트,
    //          getPoint : 얻은 포인트,
    //          totalPoint: 총 포인트,
    //          state: “player”
    //         },
    //        ......
    //     ],
    //     lost:[
    //        {
    //         id : “user1"
    //         usePoint : 사용한 포인트,
    //         getPoint : 얻은 포인트,
    //         totalPoint: 총 포인트,
    //         state: “player”
    //        },
    //        ......
    //     ],
    //     result: {win : id},
    //     }

    const winUsers = getGameResult.win
    const LoseUsers = getGameResult.lost

    const resultgame = {
        userInfo: [
            {
                id: "test1",
                score: 1234,
                gamePoint: 300,
                getPoint: 400,
                state: "player",
            },
            {
                id: "test2",
                score: 1234,
                gamePoint: 300,
                getPoint: 400,
                state: "player",
            },
            {
                id: "test3",
                score: 1234,
                gamePoint: 300,
                getPoint: 400,
                state: "observer",
            },
            {
                id: "test4",
                score: 1234,
                gamePoint: 300,
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

    function checkWinner(element) {
        if (element.id === userId) {
            return true;
        }
    }
    const test_list = [{ id: 'test1' }, { id: "test2" }, { id: "test3" }]
    let boo = test_list.some(checkWinner)

    return (
        <>
            {boo
                ?
                <div className="result-container" style={{ margin: "100px auto", width: "60%" }}>
                    <GameResult>
                        <Text is_size="150px" is_bold="1500" is_line_height="180px" is_stroke="3px #94D7BB" is_color="white" >승리</Text>
                    </GameResult>
                    <div style={{ display: "flex", width: "100%" }}>
                        <ResultWinMainTable columns={main_columns} data={data} />
                        <ResultWinPointTable columns={point_columns} data={data} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button is_width="15%" is_max_width="8rem" is_min_width="8rem" is_margin="0 4px 0 0" is_padding="5px 10px" is_size="25px"
                            is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                        >
                            계속하기
                        </Button>
                        <Button is_width="15%" is_max_width="8rem" is_min_width="7rem" is_margin="0 0 0 4px" is_padding="5px 10px" is_size="25px"
                            is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                            _onClick={exitResult}
                        >
                            나가기
                        </Button>
                    </div>
                </div>
                :
                <div className="result-container" style={{ margin: "100px auto", width: "60%" }}>
                    <GameResult>
                        <Text is_size="150px" is_bold="900" is_line_height="180px" is_stroke="3px #94D7BB" is_color="#565656" >패배</Text>
                    </GameResult>
                    <div style={{ display: "flex", width: "100%" }}>
                        <ResultLoseMainTable columns={main_columns} data={data} />
                        <ResultLosePointTable columns={point_columns} data={data} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button is_width="15%" is_max_width="8rem" is_min_width="8rem" is_margin="0 4px 0 0" is_padding="5px 10px" is_size="25px"
                            is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                        >
                            계속하기
                        </Button>
                        <Button is_width="15%" is_max_width="8rem" is_min_width="7rem" is_margin="0 0 0 4px" is_padding="5px 10px" is_size="25px"
                            is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                            _onClick={exitResult}
                        >
                            나가기
                        </Button>
                    </div>
                </div>
            }
        </>
    );
}


const GameResult = styled.div`
    width: 100%;
    margin: 0 auto;
    // border: 1px solid pink;
    text-align: center;
`

export default Result;