import React from "react";
import styled from "styled-components";
import { Text } from "../elements/index";
import Progress from "./Progress";


const PlayerCardB = (props) => {
    const win =props.playerInfo.score[0];
    const lose =props.playerInfo.score[1]
    console.log("props.playerInfo",props.playerInfo)
    return (
        <Container>
            <UserFace/>
            <Text
            is_bold
            is_size="30px"
            is_margin="20px 0"
            > {props.playerInfo.id}</Text>
            <ProgressWrap>
            <Progress 
            win={win} 
            lose={lose}
            />
            </ProgressWrap>
            <Text
            is_margin ="10px"
            >승률 {(win / (win + lose))? (win / (win + lose)) * 100 + "%" : 0 +"%"} </Text>
            <Text
                is_size="15px"
            >(전체 {win}승{lose}패 )</Text>
        </Container>
    )
};
const Container = styled.div`
width : 200px;
height: 300px;
border : 4px solid #94d7bb;
border-radius : 15px;
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
margin : 25px auto;
`;
export default PlayerCardB;
