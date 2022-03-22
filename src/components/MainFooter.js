import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { Text, Button } from "../elements/index";
import Logo from "../pictures/omogLogo.png";
import First from "../pictures/First1.png";
import Second from "../pictures/Second2.png";
import Third from "../pictures/Third3.png";

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

  const openModal = () => {
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  const UserFaceColor =(point)=>{
    let color= "black 2px"
    if(point >= 1300 && point < 1500){
      color = "#D3AB6F 3px";
      return color;
    }
    if(point >= 1500 && point < 2000){
      color ="#B2B2B2 3px";
      return color;
    }
    if(point >= 2000 && point < 3000){
      color ="#FFF27E 3px";
      return color;
    }
    if(point >= 3000){
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
          현재 접속 유저
        </Text>
        <UserContents>
          {user_list.map((p, idx) => {
            return (
              <UserContent key={idx}>
                <Userurl color={UserFaceColor(p.point)}/>
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
          <Text is_bold is_margin="0 20px 0 0 ">
            오늘의 랭킹
          </Text>

          <LeaderBoard
            open={modalOpen}
            close={closeModal}
            header="누가 누가 잘 했나?"
          >
            <LogoWrap>
              <LogoImg src={Logo} />
            </LogoWrap>
            <SuperLeaders>
              <Leader>
              
                <FirstImg src={First}/>
                <Text>{leader_board[0].id}</Text>
                <Text>{leader_board[0].point}</Text>
              </Leader>
              <Leader>
              <SecondImg src={Second}/>
                <Text>{leader_board[1].id}</Text>
                <Text>{leader_board[1].point}</Text>
              </Leader>
              <Leader>
                <ThirdImg src={Third}/>
                <Text>{leader_board[2].id}</Text>
                <Text>{leader_board[2].point}</Text>
              </Leader>
            </SuperLeaders>
            <LeaderSlider list={leader_board} />
          </LeaderBoard>
        </RankingTitle>
        <UserContents>
          {user_leaders.map((p, idx) => {
            return (
              <UserContent key={idx}>
                <Userurl color={UserFaceColor(p.point)} />
                <Text
                  is_size="20px"
                  is_color="black"
                  is_margin="4px"
                >{`${p.id}`}</Text>
              </UserContent>
            );
          })}
        </UserContents>
        <Button
          is_width="65px"
          is_height="24px"
          is_border="none"
          is_hover="inset -3em 0 0 0 #94d7bb, inset 2em 0 0 0 #94d7bb"
        >
          <Text
            _onClick={() => {
              openModal();
            }}
            is_bold
          >
            더보기⇑{" "}
          </Text>
        </Button>
      </Ranking>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  margin: 0 50px 0 250px;
  width: 900px;
  max-widit: 900px;
  justify-content: space-between;
`;
const UserS = styled.div`
  width: 400px;
  height: 100px;
  max-height: 100px;
  display: flex;
`;
const Ranking = styled.div`
  height: 100px;
  display: flex;
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
const LogoWrap = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  right: 600px;
  bottom: 200px;
`;
const LogoImg = styled.img`
  width: 200px;
  height: 100px;
`;
const DdongGraMe = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: solid 2px black;
`;
const SuperLeaders = styled.div`
  display: flex;
  justify-content: space-around;
  width: 500px;
  padding: 0 60px;
`;
const Leader = styled.div`
  text-align: center;
`;
const FirstImg=styled.img`
width: 50px;
  height: 50px;
  `;
const SecondImg=styled.img`
width: 50px;
  height: 50px;
  `;
const ThirdImg=styled.img`
width: 50px;
  height: 50px;
  `;
export default MainFooter;
