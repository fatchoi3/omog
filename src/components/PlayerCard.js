import React  from "react";
import styled from "styled-components";
import { Text } from "../elements/index";


const PlayerCard = (props) =>{
    return(
        <Container>
          <h1> {props.playerInfo.id}</h1>
            <Text
            is_size = "15px"
            >승{props.playerInfo.score[0]} 
            패{props.playerInfo.score[1]} </Text>
        </Container>
    )
};
const Container = styled.div`
width : 300px;
height: 200px;
    border : 2px solid black;
`;
export default PlayerCard;
