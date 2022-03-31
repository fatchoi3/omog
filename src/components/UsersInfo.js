import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { Text, Button } from "../elements/index";

import Progress from "./Progress";
import UserModal from "./UserModal";
import exit from "../pictures/exit.png";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import profile1 from "../pictures/omok-profile1.svg";
import profile2 from "../pictures/omok-profile2.svg";
import profile3 from "../pictures/omok-profile3.svg";
import profile4 from "../pictures/omok-profile4.svg";
import profile5 from "../pictures/omok-profile5.svg";
import profile6 from "../pictures/omok-profile6.svg";
import profile7 from "../pictures/omok-profile7.svg";
import profile8 from "../pictures/omok-profile8.svg";
import profile9 from "../pictures/omok-profile9.svg";
import profile10 from "../pictures/omok-profile10.svg";
import profile11 from "../pictures/omok-profile11.svg";

const UsersInfo = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState("");
  const get_user = useSelector((state) => state.user.userInfo);

  const userId = localStorage.getItem("userId");
  const profileImage = get_user.profileImage;
  console.log("get_user", get_user.score);
  const win = get_user.score[0].win;
  const lose = get_user.score[1].lose;
  const point = get_user.point;

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

  const color = UserFaceColor(point);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const changeRadioQ1 = (e) => {
    setState(e.target.value);
  };

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
          // dispatch(userActions.logout());
        }}
      >
        
        <Text is_size="1.05vw" is_margin="0.59vw 0 0 0.29vw" is_color="#C4C4C4" is_bold>
          로그아웃
        </Text>
        <ExitImg src={exit} />
      </Button>
      <User>
        {/* <Button
          is_background="transparent"
          is_border="none"
          is_cursor
          _onClick={() => {
            // openModal();
          }}
        > */}
          <UserFace
            color={color}
            img={
              profileImage ? profileImage : "https://haksae90.shop/images/1.svg"
            }
          />
        {/* </Button> */}

        <UserName>
          <Text is_bold is_size="2.34vw" is_margin="0.59vw">
            {get_user.id}
          </Text>
          <Text is_margin="1.46vw 0 0 0" is_size="1.17vw"> Point {get_user.point} P</Text>
        </UserName>
      </User>
      <Progress win={win} lose={lose} width="20.5vw" margin=" 1.46vw auto 0.59vw" />
      <UserScore>
        <Text is_size="1.17vw" is_margin="0vw 1.17vw" is_bold>
          승률{" "}
          {Math.ceil(win / (win + lose))
            ? Math.ceil((win / (win + lose)) * 100) + "%"
            : 0 + "%"}
        </Text>
        <Text is_size="1.17vw" is_margin="0vw 1.17vw 0 0" is_bold>
          (전체 {win}승 {lose}패)
        </Text>
      </UserScore>
      {/* <UserModal open={modalOpen} close={closeModal}>
        <UserM>
          <UserFaceM
            color={color}
            img={
              profileImage ? profileImage : "https://haksae90.shop/images/1.svg"
            }
          />
          <UserNameM>
            <Text is_bold is_size="1.76vw" is_margin="0.59vw">
              {get_user.id}
            </Text>
            <Text is_margin="0.88vw 0 0 0"> Point {get_user.point} P</Text>
          </UserNameM>
        </UserM>
        <Progress win={win} lose={lose} width="14.65vw" margin=" 0 auto" />
        <UserScoreM>
          <Text is_size="0.82vw" is_margin="0.59vw 20 px" is_bold>
            승률{" "}
            {Math.ceil(win / (win + lose))
              ? Math.ceil((win / (win + lose)) * 100) + "%"
              : 0 + "%"}
          </Text>
          <Text is_size="0.82vw" is_margin="0.59vw 1.17vw">
            (전체 {win}승 {lose}패)
          </Text>
        </UserScoreM>
        <ProfileWrap>
          <div>
          <ProfileRadio
            type="radio"
            id="1"
            name="color"
            value="1"
            onChange={changeRadioQ1}
          />
          <Label for="1">
          <ProfileLabel for="1" profile={profile1} />
          </Label>
          </div>
            
          <div>
          <ProfileRadio
            type="radio"
            id="2"
            name="color"
            value="2"
            onChange={changeRadioQ1}
          />
 <Label for="2">
          <ProfileLabel for="2" profile={profile2} />
          </Label>
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="3"
            name="color"
            value="3"
            onChange={changeRadioQ1}
          />
           <Label for="3">
          <ProfileLabel for="3" profile={profile3} />
          </Label>
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="4"
            name="color"
            value="4"
            onChange={changeRadioQ1}
          />
           <Label for="4">
          <ProfileLabel for="4" profile={profile4} />
          </Label>
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="5"
            name="color"
            value="5"
            onChange={changeRadioQ1}
          />
              <Label for="5">
          <ProfileLabel for="5" profile={profile5} />
          </Label>
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="6"
            name="color"
            value="6"
            onChange={changeRadioQ1}
          />
             <Label for="6">
          <ProfileLabel for="6" profile={profile6} />
          </Label>
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="7"
            name="color"
            value="7"
            onChange={changeRadioQ1}
          />
               <Label for="7">
          <ProfileLabel for="7" profile={profile7} />
          </Label>
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="8"
            name="color"
            value="8"
            onChange={changeRadioQ1}
          />
           <Label for="8">
          <ProfileLabel for="8" profile={profile8} />
          </Label>
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="9"
            name="color"
            value="9"
            onChange={changeRadioQ1}
          />
            <Label for="9">
          <ProfileLabel for="9" profile={profile9} />
          </Label>
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="10"
            name="color"
            value="10"
            onChange={changeRadioQ1}
          />
          <ProfileLabel for="10" profile={profile10} />
          </div>
          <div>
          <ProfileRadio
            type="radio"
            id="11"
            name="color"
            value="11"
            onChange={changeRadioQ1}
          />
          <ProfileLabel for="11" profile={profile11} />
        </div>
        </ProfileWrap>
      </UserModal> */}
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
  margin : 0 2.93vw;
`;

const UserScore = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.29vw 0 0 0;
  text-align: center;
  width : 23.43vw;
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
const UserM = styled.div`
  display: flex;
`;

const UserScoreM = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.29vw 1.17vw 0 1.17vw;
  text-align: center;
`;
const UserFaceM = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  border-inline: solid 0.18vw black;
  width: 4.1vw;
  height: 4.1vw;
  border-radius: 4.1vw;
  border: solid ${(props) => props.color};
  margin: 0vw 4.1vw 0.59vw 4.69vw;
`;
const UserNameM = styled.div`
  height: 5.27vw;
  width: 7.91vw;
  padding: 0.76vw 0 0 0;
`;
const ProfileWrap = styled.div`
  width: 23.43vw;
  height: 11.72vw;
  display: flex;
  flex-wrap: wrap;
`;

const ProfileLabel = styled.div`
  width: 2.34vw;
  height: 2.34vw;

  border: 0.12vw solid black;
  border-radius: 2.34vw;
  background-image: url(${(props) => props.profile});
  background-size: contain;
  background-repeat: no-repeat;
`;
const ProfileRadio = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:checked {
    background: #94d7bb;
    border: 0.12vw solid #94d7bb;
  }
  &:checked + ${ProfileLabel} {
    border: 0.06vw solid #94d7bb;
    box-shadow: 0vw 0.23vw 0.59vw 0.23vw rgba(0, 0, 0, 0.25);
  }

`;
const Label = styled.label`
width: 2.93vw;
height: 2.93vw;
margint : 0 0.12vw;
border : 0.12vw solid black;
border-radius: 0.88vw;
background-color: transparent;
display: flex;
align-items: center;
justify-content: center;
position : absolute;
`;
const ExitImg = styled.img`
  width: 35%;
  height: 70%;
`;
export default UsersInfo;
