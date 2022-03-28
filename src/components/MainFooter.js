import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { Text, Button } from "../elements/index";
import Banner from "../pictures/banner.png";


import LeaderBoard from "./LeaderBoard";
import LeaderSlider from "./LeaderSlider";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const MainFooter = () => {
  const dispatch = useDispatch();
  const user_list = useSelector((state) => state.user.list);
  const user_leaders = useSelector((state) => state.user.leader_list);
  const leader_board = useSelector((state) => state.user.leader_board);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("user_list", user_list)
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const UserFaceColor = (point) => {
    let color = "black 2px";
    if (point >= 1300 && point < 1500) {
      color = "#835506 3px";
      return color;
    }
    if (point >= 1500 && point < 2000) {
      color = "#B2B2B2 3px";
      return color;
    }
    if (point >= 2000 && point < 3000) {
      color = "#FFF27E 3px";
      return color;
    }
    if (point >= 3000) {
      color = "#22E1E4 3px";
      return color;
    }
    return color;
  };

  useEffect(() => {
    dispatch(userActions.getUserDB());
    dispatch(userActions.getLeaderDB());
    dispatch(userActions.getLeaderBoardDB());
  }, []);
  return (
    <Container>
      <UserS>
        <Nemo />
        <Text is_bold is_margin="0 20px 0 0 ">
          오목조목 유저
        </Text>
        <UserContents>
          {user_list.map((p, idx) => {
            return (
              <UserContent key={idx}>

                <Userurl color={UserFaceColor(p.point)} img={p.profileImage ? p.profileImage:"https://haksae90.shop/images/1.svg"} />

                <Text
                  is_size="20px"
                  is_color="black"
                  is_margin="4px"
                >{`${p.id}`}</Text>
              </UserContent>
            );
          })}
        </UserContents>
      </UserS>
      <Ranking>
        <RankingTitle>
          <Nemo />
          <div>
            <Text is_bold is_margin="0 20px 0 0 ">
              오늘의 랭킹
            </Text>
            <Button
              is_width="80px"
              is_height="24px"
              is_margin=" 10px"
              is_border="none"
              is_background="transparent"
              is_hover="inset -2em 0 0 0 #94d7bb, inset 4em 0 0 0 #94d7bb"
            >
              <Text
                _onClick={() => {
                  openModal();
                }}
                is_bold
                is_size="20px"
              >
                더보기⇑{" "}
              </Text>
            </Button>
          </div>
          <LeaderBoard open={modalOpen} close={closeModal} header="오늘의 랭킹">
            <SuperLeaders>
              <Leader>
              
                <FirstImg src={leader_board[0]?.profileImage} img={leader_board[0]?.profileImage} />
        
               
             
                <Text

                is_size="25px"
                is_bold
                is_margin=" 0 0 8px 0"
                >{leader_board[0]?.id}</Text>
                <Text>   {leader_board[0]?.point} p </Text>
              </Leader>
              <Leader>
              
                <SecondImg src={leader_board[1]?.profileImage} img={leader_board[1]?.profileImage} />

                <Text
                is_size="25px"
                is_bold
                is_margin=" 0 0 8px 0"
                >{leader_board[1]?.id}</Text>
                <Text> {leader_board[1]?.point} p </Text>
              </Leader>
              <Leader>
         
                <ThirdImg src={leader_board[2]?.profileImage} img={leader_board[2]?.profileImage} />
              
                <Text
                is_size="25px"
                is_bold
                is_margin=" 0 0 8px 0"
                >{leader_board[2]?.id}</Text>
                <Text> {leader_board[2]?.point} p</Text>
              </Leader>
            </SuperLeaders>
            <LeaderSlider list={leader_board} />
          </LeaderBoard>
        </RankingTitle>
        <UserContents>
          {user_leaders.map((p, idx) => {
            return (
              <UserContent key={idx}>
                <Userurl color={UserFaceColor(p.point)} img={p.profileImage ? p.profileImage:"https://haksae90.shop/images/1.svg"} />
                <Text
                  is_size="20px"
                  is_color="black"
                  is_margin="4px"
                >{`${p.id}`}</Text>
              </UserContent>
            );
          })}
        </UserContents>
      </Ranking>
      <Button
        is_width=" 362"
        is_height="103"
        is_border="none"
        is_background="transparent"
        _onClick={() => {
          window.open("https://forms.gle/AxysJH5XHe66kKDn8", "_blank");
        }}
      >
        <BannerImg src={Banner}/>
        
      </Button>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  margin: 0 20% 0 8%;
  width: 87%;
  max-widit: 900px; ;
`;
const UserS = styled.div`
  width: 28%;
  height: 100px;
  max-height: 100px;
  margin: 0 3% 0 0;
  display: flex;
`;
const Ranking = styled.div`
  width: 26%;
  height: 100px;
  display: flex;
  margin: 0 3% 0 0;
`;
const UserContents = styled.div`
  width: 180px;
  border: solid 1px black;
  height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  border-radius: 10px;
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.25);
`;
const UserContent = styled.div`
  height: 30px;
  display: flex;
  margin: 6px;
`;
const Userurl = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 20px;
  border: solid ${(props) => props.color};
  background: #f0f0f0;
  background-image : url(${(props) => props.img});
  background-size : contain;
  background-repeat: no-repeat;
`;
const RankingTitle = styled.div`
  display: flex;
`;
const Nemo = styled.div`
  width: 15px;
  height: 15px;
  background-color: #94d7bb;
  margin: 4px 3px 0 0;
`;

const SuperLeaders = styled.div`
  display: flex;
  width: 100%;
  margin: 5% 18%;
`;
const Leader = styled.div`
  width: 20%;
  height: 20%;
  text-align: center;
`;
const FirstImg = styled.img`
  width: 50%;
  height: 50%;
`;
const SecondImg = styled.img`
  width: 50%;
  height: 50%;
`;
const ThirdImg = styled.img`
  width: 50%;
  height: 50%;
`;
const BannerImg =styled.img`
width : 500px;

`;
// const Img1 = styled.img`
// width: 25px;
// height: 50px;
// margin : 0 5px 0 0;
// `;
// const Img2 = styled.img`
// width: 40px;
// height: 50px;
// `;
// const Img3 = styled.img`
// width: 40px;
// height: 50px;
// `;
const Div = styled.div`
display:flex;
`;
export default MainFooter;
