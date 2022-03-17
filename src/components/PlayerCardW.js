import React from "react";
import styled from "styled-components";
import { Text } from "../elements/index";
import Progress from "./Progress";

const PlayerCardW = (props) => {
    const win =props.playerInfo.score[0];
    const lose =props.playerInfo.score[1]
    return (
        <Container>
            <UserFace/>
            <Text
            is_bold
            is_size="30px"
            > {props.playerInfo.id}</Text>
            <ProgressWrap>
            <Progress 
            win={win} 
            lose={lose}
            />
            </ProgressWrap>
            <Text>승률 {(win / (win + lose))? (win / (win + lose)) * 100 + "%" : 0 +"%"} </Text>
            <Text
                is_size="15px"
            >(전체 {win}승{lose}패 )</Text>
        </Container>
    )
};
const Container = styled.div`
width : 200px;
height: 300px;
border : 2px solid #E7E7E7;
border-radius : 15px;
background-color : #E7E7E7;
margin : 10px 0;
text-align: center;
`;
const ProgressWrap =styled.div`
width: 150px;
margin: 0 auto;
`;
const UserFace = styled.div`
width: 70px;
height: 70px;
border-radius : 70px;
background-color : white;
border : 3px solid black;
margin : 10px auto;
`;
export default PlayerCardW;
