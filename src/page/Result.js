import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Text, Button } from '../elements';
import ResultWinMainTable from '../components/Result/ResultWinMainTable';
import ResultWinPointTable from '../components/Result/ResultWinPointTable';
import ResultLoseMainTable from '../components/Result/ResultLoseMainTable';
import ResultLosePointTable from '../components/Result/ResultLosePointTable';
import Spinner from '../elements/Spinner';
import loser from '../pictures/loser.svg'
import winner from '../pictures/winner.svg'

import { actionCreators as gameActions } from '../redux/modules/game';


function Result(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const result = useSelector(state => state.game.result);
    console.log(result);
    const getGameResult = useSelector(state => state.game.gameResult);
    console.log(getGameResult);
    const userId = sessionStorage.getItem('userId');

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
                Header: "얻은 포인트",
            },
            {
                accessor: "existPoint",
                Header: "기존 포인트",
            }
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
        dispatch(gameActions.gameOutDB(result.gameNum));
        history.push(`/main`);
    }

    useEffect(() => {
        let timer = setTimeout(() => { dispatch(gameActions.getGameResultDB(userId, result.gameNum, result.result)) }, 1000);

        return () => { clearTimeout(timer) }
    }, [result, dispatch])

    useEffect(() => {
        let timer = setTimeout(() => {
            setLoading(false)
            return () => { clearTimeout(timer) }
        }, 3000)
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
            {loading ? (<Spinner type={'page'} is_result={true} width="200px" loading_time={2} />) : ""}
            {isWinner
                ?
                <ResultContainer>
                    <div className="result__wrap">
                        <div className="result__text">
                            <img src={winner} alt="승리자" />
                            <Text is_size="150px" is_bold="1500" is_line_height="180px" is_stroke="3px #94D7BB" is_color="white" >승리</Text>
                        </div>
                        <div style={{ display: "flex", width: "100%" }}>
                            <ResultWinMainTable columns={main_columns} data={winData} />
                            <ResultWinPointTable columns={point_columns} data={winData} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                is_width="15%"
                                is_max_width="8rem"
                                is_min_width="7rem"
                                is_margin="0 0 0 4px"
                                is_padding="5px 10px"
                                is_size="25px"
                                is_background="white"
                                is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                                is_radius="14px"
                                _onClick={exitResult}
                            >
                                나가기
                            </Button>
                        </div>
                    </div>
                </ResultContainer>
                :
                <ResultContainer>
                    <div className="result__wrap">
                        <div className="result__wrap__box">
                            <p className="result__wrap__box__text">패배</p>
                            <img src={loser} alt="패배자" />
                        </div>
                        <div style={{ display: "flex", width: "100%" }}>
                            <ResultLoseMainTable columns={main_columns} data={loseData} />
                            <ResultLosePointTable columns={point_columns} data={loseData} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                is_width="15%"
                                is_max_width="8rem"
                                is_min_width="7rem"
                                is_margin="0 0 0 4px"
                                is_padding="5px 10px"
                                is_size="25px"
                                is_background="white"
                                is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                                is_radius="14px"
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

    > div {
        margin: 100px auto;
        

        > div:nth-child(1) {
            display: flex;
            justify-content: center;
            width: 100%;
            margin: 0 auto;
            text-align: center;

            >p {
                font-size: 150px;
                font-weight: 900;
                line-height: 180px;
                -webkit-text-stroke: 3px #94D7BB;
                color: #565656;
                margin: 0;
                padding: 0;
            }
        }
    }

@media only screen and (max-width: 600px) {
    >div {
        width: 90%;

        >div:nth-child(1) {
            width: 80%;
            margin: 0 auto;

            >p {
                font-size: 100px;
            }
        }
    }
}

@media only screen and (min-width: 600px) {
    >div {
        width: 80%;

        > div:nth-child(1){
            >p{
                font-size: 120px;
            }
        }
    }
}

@media only screen and (min-width: 992px) {
    >div {
        width: 70%;

        > div:nth-child(1){
            >p{
                font-size: 130px;
            }
        }
    }
}

@media only screen and (min-width: 1200px) {
    >div {
        width: 60%;

        > div:nth-child(1){
            >p{
                font-size: 150px;
            }
        }
    }
}
`

export default Result;