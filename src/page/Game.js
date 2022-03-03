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
`;
export default Game;