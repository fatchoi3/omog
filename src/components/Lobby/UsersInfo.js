import { React, useEffect } from "react";
import styled from "styled-components";

import { Text, Button } from "../../elements/index";

import Progress from "./Progress";
import exit from "../../pictures/exit.png";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

const UsersInfo = () => {
  const dispatch = useDispatch();
  const get_user = useSelector((state) => state.user.userInfo);

  const userId = sessionStorage.getItem("userId");
  const profileImage = get_user.profileImage;
  const win = get_user.score[0].win;
  const lose = get_user.score[1].lose;
  const point = get_user.point;

  const UserFaceColor = (point) => {
    let color = "black 0.12vw";
    if (point >= 1300 && point < 2000) {
      color = "#835506 0.23vw";
      return color;
    }
    if (point >= 2000 && point < 3000) {
      color = "#B2B2B2 0.23vw";
      return color;
    }
    if (point >= 3000 && point < 5000) {
      color = "#FFF27E 0.23vw";
      return color;
    }
    if (point >= 5000 && point < 7000) {
      color = "#22E1E4 0.23vw";
      return color;
    }
    if (point >= 7000 && point < 10000) {
      color = "#c734ca 0.23vw";
      return color;
    }
    if (point >= 10000) {
      color = "#af2525 0.23vw";
      return color;
    }
    return color;
  };

  const color = UserFaceColor(point);

  useEffect(() => {
    dispatch(userActions.loginCheckDB(userId));
  }, []);
  return (
    <UserInfoContainer>
      <Button
        is_margin="0vw 0vw 0.12vw 14.65vw"
        is_height="2.93vw"
        is_width="8.79vw"
        is_radius="0.47vw"
        is_border="none"
        is_background="transparent"
        is_cursor
        is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
        is_display="flex"
        _onClick={() => {
          dispatch(userActions.logoutDB(userId));
        }}
      >
        <Text
          is_size="1.05vw"
          is_margin="0.59vw 0 0 0.29vw"
          is_color="#C4C4C4"
          is_bold
        >
          로그아웃
        </Text>
        <ExitImg src={exit} />
      </Button>
      <User>
        <UserFace
          color={color}
          img={
            profileImage ? profileImage : "https://haksae90.shop/images/1.svg"
          }
        />

        <UserName>
          <Text is_bold is_size="2.34vw" is_margin="0.59vw">
            {get_user.id}
          </Text>
          <Text is_margin="1.46vw 0 0 0" is_size="1.17vw">
            Point {get_user.point} P
          </Text>
        </UserName>
      </User>
      <Progress
        win={win}
        lose={lose}
        width="20.5vw"
        margin=" 1.46vw auto 0.59vw"
      />
      <UserScore>
        <Text is_size="1.17vw" is_margin="0vw 1.17vw" is_bold>
          승률
          {Math.ceil(win / (win + lose))
            ? Math.ceil((win / (win + lose)) * 100) + "%"
            : 0 + "%"}
        </Text>
        <Text is_size="1.17vw" is_margin="0vw 1.17vw 0 0" is_bold>
          (전체 {win}승 {lose}패)
        </Text>
      </UserScore>
    </UserInfoContainer>
  );
};
const UserInfoContainer = styled.div`
  height: 14.65vw;
  width: 23.43vw;
`;
const User = styled.div`
  display: flex;
  height: 5.86vw;
  width: 23.43vw;
  margin: 0 2.93vw;
`;

const UserScore = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.29vw 0 0 0;
  text-align: center;
  width: 23.43vw;
`;
const UserFace = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  border-inline: solid 0.18vw black;
  width: 5.27vw;
  height: 5.27vw;
  border-radius: 5.27vw;
  border: solid ${(props) => props.color};
  margin: 0.59vw 0vw 0.59vw 0vw;
`;
const UserName = styled.div`
  height: 5.27vw;
  width: 7.91vw;
  padding: 0.76vw 0 0 0;
`;
const ExitImg = styled.img`
  width: 35%;
  height: 70%;
`;
export default UsersInfo;
