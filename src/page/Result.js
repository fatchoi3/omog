import React from 'react';
import styled from 'styled-components';
import { Text } from '../elements';




function Result(props) {

    const result = { win: "id" }
    const resultgame = {
        id: "user1",
        state:
            "blackPlayer",
        score: { win: 1 },
        point: 1000,
        gameNum: 1,
    }

    return (
        <div className="result-container" style={{ margin: "100px auto", width: "600px", height: "600px", border: "1px solid red" }}>
            <PlayerResult>
                <Text>{result.win} 님이 승리하였습니다!</Text>
            </PlayerResult>
        </div>
    );
}

const PlayerResult = styled.div`
    width: 300px;
    height: 50px;
    margin: 0 auto;
    border: 1px solid pink;
    text-align: center;
`

export default Result;