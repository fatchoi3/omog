import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Text, Button } from '../elements';
import ResultWinMainTable from '../components/Result/ResultWinMainTable';
import ResultWinPointTable from '../components/Result/ResultWinPointTable';
import ResultLoseMainTable from '../components/Result/ResultLoseMainTable';
import ResultLosePointTable from '../components/Result/ResultLosePointTable';
import Spinner from '../elements/Spinner';

import { actionCreators as gameActions } from '../redux/modules/game';


function Result(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const result = useSelector(state => state.game.result);
    console.log(result);
    const getGameResult = useSelector(state => state.game.gameResult);
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
                Header: "사용 포인트",
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
    }, [result, dispatch])

    useEffect(() => {
        let timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);


    const winData = useMemo(() => [...getGameResult.win], [getGameResult.win])
    const loseData = useMemo(() => [...getGameResult.lose], [getGameResult.lose])

    function checkWinner(element) {
        if (element.id === userId) {
            return true;
        }
    }

    let isWinner = getGameResult.win.some(checkWinner)

    return (
        <>

            {loading ? (<Spinner type={'page'} is_dim={true} width="200px" />) : ""}
            {isWinner
                ?
                <ResultContainer>
                    <div className="result-container" style={{ margin: "100px auto", width: "60%", position: "relative" }}>
                        <GameResultText>
                            <Text is_size="150px" is_bold="1500" is_line_height="180px" is_stroke="3px #94D7BB" is_color="white" >승리</Text>
                        </GameResultText>
                        <div style={{ display: "flex", width: "100%" }}>
                            <ResultWinMainTable columns={main_columns} data={winData} />
                            <ResultWinPointTable columns={point_columns} data={winData} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button is_width="15%" is_max_width="8rem" is_min_width="8rem" is_margin="0 4px 0 0" is_padding="5px 10px" is_size="25px"
                                is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB" is_background="white"
                            >
                                계속하기
                            </Button>
                            <Button is_width="15%" is_max_width="8rem" is_min_width="7rem" is_margin="0 0 0 4px" is_padding="5px 10px" is_size="25px"
                                is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB" is_background="white"
                                _onClick={exitResult}
                            >
                                나가기
                            </Button>
                        </div>
                    </div>
                </ResultContainer>
                :
                <ResultContainer>
                    <div className="result-container" style={{ margin: "100px auto", width: "60%" }}>
                        <GameResultText>
                            <Text is_size="150px" is_bold="900" is_line_height="180px" is_stroke="3px #94D7BB" is_color="#565656" >패배</Text>
                        </GameResultText>
                        <div style={{ display: "flex", width: "100%" }}>
                            <ResultLoseMainTable columns={main_columns} data={loseData} />
                            <ResultLosePointTable columns={point_columns} data={loseData} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button is_width="15%" is_max_width="8rem" is_min_width="8rem" is_margin="0 4px 0 0" is_padding="5px 10px" is_size="25px"
                                is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB" is_background="white" is_position="relative"
                            >
                                계속하기
                            </Button>
                            <Button is_width="15%" is_max_width="8rem" is_min_width="7rem" is_margin="0 0 0 4px" is_padding="5px 10px" is_size="25px" is_background="white"
                                is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                                _onClick={exitResult}
                            >
                                나가기
                            </Button>
                        </div>
                    </div>
                </ResultContainer>
            }
        </>
    );
}

const ResultContainer = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 10;
`

const GameResultText = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
`

export default Result;