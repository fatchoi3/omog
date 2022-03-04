import React from "react";
import styled from "styled-components";

import Omog from "../components/Omog";
import Chatting from "../components/Chatting";

const Game = ()=>{
    return(
        <GameContainer>
        <Omog/>
        <Chatting/>
        </GameContainer>
    )
};
const GameContainer = styled.div`
display:flex;
width : 1000px;
margin : 0 auto;
`;
export default Game;