import React from "react";
import styled from "styled-components";

import Omog from "../components/Omog";
import Chatting from "../components/Chatting";
import Teaching from "../components/Teaching";
import PlayerCard from "../components/PlayerCard";

const Game = () => {
  const userInfo = {
    id: "jong0325",
    score: (2, 3),
    point: 1000,
    state: "player",
  };
  const playerlist = [
    {
      id: "jong0325",
      score: [2, 3],
      point: 1000,
      state: "playerW",
    },
    {
      id: "sssssseok",
      score: [3, 2],
      point: 1000,
      state: "playerB",
    },
  ];
  return (
    <GameContainer>
      <Wrap>
        <Omog />
        <UnderInfo>
          {userInfo.state == ("playerW" || "playerB") ? (
            <TeachingWrap>
              <Teaching playerInfo={playerlist[0]} />
              <Teaching playerInfo={playerlist[1]} />
            </TeachingWrap>
          ) : (
            <PlayerCardWrap>
              <PlayerCard playerInfo={playerlist[0]} />
              <PlayerCard playerInfo={playerlist[1]} />
            </PlayerCardWrap>
          )}
        </UnderInfo>
      </Wrap>
      <Chatting />
    </GameContainer>
  );
};
const GameContainer = styled.div`
  display: flex;
  width: 1000px;
  margin: 0 auto;
`;
const Wrap = styled.div``;
const TeachingWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PlayerCardWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UnderInfo = styled.div``;
export default Game;
