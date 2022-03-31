import React, { memo } from "react";
import styled from "styled-components";

import Heart from "../../pictures/Heart.png";
import { Text } from "../../elements/index";
import Progress from "../Progress";

const PlayerCardW = memo(({ playerInfo, min, sec, isTeam }) => {
  const win = playerInfo?.score[0].win;
  const lose = playerInfo?.score[1].lose;

  const UserFaceColor = (point) => {
    let color = "black 0.12vw";
    if (point >= 1300 && point < 1700) {
      color = "#835506 0.29vw";
      return color;
    }
    if (point >= 1700 && point < 2500) {
      color = "#B2B2B2 0.29vw";
      return color;
    }
    if (point >= 2500 && point < 4000) {
      color = "#FFF27E 0.29vw";
      return color;
    }
    if (point >= 4000) {
      color = "#22E1E4 0.29vw";
      return color;
    }
    return color;
  };

  return (
    <Container>
      {isTeam === "white" ? <HeartImg src={Heart} /> : ""}
      <UserFace
        color={UserFaceColor(playerInfo?.point)}
        img={playerInfo?.profileImage}
      />
      <Text is_bold is_size="1.76vw" is_margin="1.17vw 0">
        {" "}
        {playerInfo ? playerInfo.id : "1"}
      </Text>
      <ProgressWrap>
        <Progress win={win} lose={lose} />
      </ProgressWrap>
      <Text is_margin="0.59vw">
        승률{" "}
        {win / (win + lose)
          ? Math.ceil((win / (win + lose)) * 100) + "%"
          : 0 + "%"}{" "}
      </Text>
      <Text is_size="0.88vw">
        (전체 {win}승{lose}패 )
      </Text>
      <Text is_bold is_margin="0.88vw" is_color="gray" is_size="1.46vw">
        {min} : {sec}
      </Text>
    </Container>
  );
});
const Container = styled.div`
  width: 11.72vw;
  height: 17.57vw;
  border: 0.23vw solid #94d7bb;
  border-radius: 0.88vw;
  margin: 0.59vw 0;
  text-align: center;
  box-shadow: -0.29vw 0.29vw 0.23vw 0vw rgba(0, 0, 0, 0.25);
  position: relative;
`;
const HeartImg = styled.img`
  position: absolute;
  right: 0;
  width: 2.93vw;
  height: 50ps;
`;
const ProgressWrap = styled.div`
  width: 8.79vw;
  margin: 0 auto;
`;
const UserFace = styled.div`
  width: 4.1vw;
  height: 4.1vw;
  border-radius: 4.1vw;
  background-color: white;
  border: solid ${(props) => props.color};
  margin: 1.46vw auto;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
`;
export default PlayerCardW;
