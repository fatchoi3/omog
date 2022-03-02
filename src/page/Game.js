import React from "react";
import styled from "styled-components";

import OmockBase from "../components/OmockBase";
import Chatting from "../components/Chatting";

const Game = ()=>{
    return(
        <GameContainer>
        <OmockBase/>
        <Chatting/>
        </GameContainer>
    )
};
const GameContainer = styled.div`
display:flex;
`;
export default Game;