import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { Text, Button } from "../elements/index";
import Banner from "../pictures/banner.png";
import Logo from "../pictures/omogLogo.png";

import LeaderBoard from "./LeaderBoard";
import LeaderSlider from "./LeaderSlider";
import First from "../pictures/1.svg";
import Second from "../pictures/2.svg";
import Third from "../pictures/3.svg";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const MainFooter = () => {
  const dispatch = useDispatch();
  const user_list = useSelector((state) => state.user.list);
  const user_leaders = useSelector((state) => state.user.leader_list);
  const leader_board = useSelector((state) => state.user.leader_board);
  const userId = localStorage.getItem("userId");
  const [modalOpen, setModalOpen] = useState(false);
  const [isUser, setUser] = useState(true);
  const [isRank, setRank] = useState(true);

  const toggleUser = () => {
    setUser(isUser => !isUser); // on,off 개념 boolean
}
const toggleRank = () => {
  setRank(isRank => !isRank); // on,off 개념 boolean
}


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const UserFaceColor = (point) => {
    let color = "black 0.12vw";
    if (point >= 1300 && point < 1700) {
      color = "#835506 0.18vw";
      return color;
    }
    if (point >= 1700 && point < 2500) {
      color = "#B2B2B2 0.18vw";
      return color;
    }
    if (point >= 2500 && point < 4000) {
      color = "#FFF27E 0.18vw";
      return color;
    }
    if (point >= 4000) {
      color = "#22E1E4 0.18vw";
      return color;
    }
    return color;
  };

  useEffect(() => {
    dispatch(userActions.getUserDB(userId));
    dispatch(userActions.getLeaderDB());
    dispatch(userActions.getLeaderBoardDB());
  }, []);
  return (
    <Container>
      <div>
      <UserS>
      
        <Nemo />
        <Text is_bold is_margin="0 2.34vw 0 0 ">
          접속 유저
        </Text>
      
        <Text is_size="20px" is_cursor is_margin="0 0 0 2.34vw " _onClick={()=>{toggleUser()}}>▽</Text>
        
      </UserS>
      {isUser?<UserContents>
          {user_list.map((p, idx) => {
            return (
              <UserContent key={idx}>
                <Userurl
                  color={UserFaceColor(p.point)}
                  img={
                    p.profileImage
                      ? p.profileImage
                      : "https://haksae90.shop/images/1.svg"
                  }
                />

                <Text
                  is_size="1.17vw"
                  is_color="black"
                  is_margin="0.23vw"
                >{`${p.id}`}</Text>
              </UserContent>
            );
          })}
        </UserContents>:""}
        </div>
      <Ranking>
      <div>
        <RankingTitle>
      
          <Nemo />
      
            <Text is_bold  is_margin="0 1.17vw 0 0 " >
              오늘의 랭킹
            </Text>
            <Text is_size="20px" is_cursor is_margin="0 0 0 2.34vw " _onClick={()=>{toggleRank()}}>▽</Text>
       </RankingTitle>
       
      {isRank?
      <Button is_width="5.86vw" is_border="none" is_background="white" is_cursor  _onClick={()=>{openModal()}}>
      <UserContents>
        {user_leaders.map((p, idx) => {
          return (
            <UserContent key={idx}>
              <Userurl
                color={UserFaceColor(p.point)}
                img={
                  p.profileImage
                    ? p.profileImage
                    : "https://haksae90.shop/images/1.svg"
                }
              />
              <Text
                is_size="1.17vw"
                is_color="black"
                is_margin="0.23vw"
              >{`${p.id}`}</Text>
            </UserContent>
          );
        })}
      </UserContents>
      </Button>:""}
      </div>
        <LeaderBoard open={modalOpen} close={closeModal} header="오늘의 랭킹">
            <SuperLeaders>
              <Leader>
                <FirstImg
                  src={First}
                />

                <Text is_size="1.46vw" is_bold is_margin=" 0 0 0.47vw 0.47vw">
                  {leader_board[0]?.id}
                </Text>
                <Text is_margin=" 0 0 0 0.7vw"> {leader_board[0]?.point} p </Text>
              </Leader>
              <Leader>
                <SecondImg
                  src={Second}
              
                />

                <Text is_size="1.46vw" is_bold is_margin=" 0 0 0.47vw 0.47vw">
                  {leader_board[1]?.id}
                </Text>
                <Text  is_margin=" 0 0 0 0.7vw"> {leader_board[1]?.point} p </Text>
              </Leader>
              <Leader>
                <ThirdImg
                  src={Third}
                
                />

                <Text is_size="1.46vw" is_bold is_margin=" 0 0 0.47vw 0.47vw">
                  {leader_board[2]?.id}
                </Text>
                <Text  is_margin=" 0 0 0 0.7vw"> {leader_board[2]?.point} p</Text>
              </Leader>
            </SuperLeaders>
            <LeaderSlider list={leader_board} />
          </LeaderBoard>
      </Ranking>
      <Button
        is_width="29.29vw"
        is_height="6.03vw"
        is_border="none"
        is_background="transparent"
        is_cursor
        _onClick={() => {
          window.open("https://forms.gle/5pS9MBLJbUVeemNW7", "_blank");
        }}
      >
        <BannerImg src={Banner} />
      </Button>
      <LogoWrap>
              <LogoImg src={Logo} />
            </LogoWrap>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  width: 87.87vw;
  margin : 1vw 0 0 3.51vw;
`;
const UserS = styled.div`
  width: 19.63vw;
  display: flex;

`;
const Ranking = styled.div`
  width: 19.63vw;
  height: 5.86vw;
  display: flex;
  margin: 0 1.76vw 0 0;
`;
const UserContents = styled.div`
  width: 10.54vw;
  border: solid 0.06vw black;
  height: 5.86vw;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  border-radius: 0.59vw;
  box-shadow: -0.29vw 0.29vw 0.23vw 0vw rgba(0, 0, 0, 0.25);
`;
const UserContent = styled.div`
  height: 1.76vw;
  display: flex;
  margin: 0.35vw;
  
`;
const Userurl = styled.div`
  height: 1.17vw;
  width: 1.17vw;
  border-radius: 1.17vw;
  border: solid ${(props) => props.color};
  background: #f0f0f0;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
`;
const RankingTitle = styled.div`
  display: flex;
  width : 11.72vw;
`;
const Nemo = styled.div`
  width: 0.88vw;
  height: 0.88vw;
  background-color: #94d7bb;
  margin: 0.23vw 0.18vw 0 0;
`;

const SuperLeaders = styled.div`
  display: flex;
  width: 50.09vw;
  margin: 1.41vw 9.96vw 0;
`;
const Leader = styled.div`
  width: 9.96vw;
  height: 9.37vw;
  text-align: center;
`;
const FirstImg = styled.img`
  width: 5.86vw;
  height: 7.03vw;

`;
const SecondImg = styled.img`
  width: 5.86vw;
  height: 7.03vw;
`;
const ThirdImg = styled.img`
  width: 5.86vw;
  height: 7.03vw;
`;
const BannerImg = styled.img`
  width: 29.29vw;
`;
const LogoWrap = styled.div`

  width: 9.72vw;
  height: 8.79vw;
  margin : 0 0 0 7.03vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoImg = styled.img`
  width: 9.72vw;
  height: 8.79vw;
`;
export default MainFooter;
