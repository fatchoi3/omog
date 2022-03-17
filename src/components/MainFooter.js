import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { Text } from "../elements/index";
import Logo from "../pictures/omogLogo.png";
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
  useEffect(() => {
    dispatch(userActions.getUserDB());
    dispatch(userActions.getLeaderDB());
    dispatch(userActions.getLeaderBoardDB());
  }, []);
  return (
    <Container>
      <UserS>
      <Nemo/>
        <Text
        is_bold
        is_margin="0 20px 0 0 "
        >현재 접속 유저</Text>
        <UserContents>
          {user_list.map((p, idx) => {
            return (
              <UserContent key={idx}>
                <Userurl />
                <Text is_size="15px" is_color="black">{`${p.id}`}</Text>
              </UserContent>
            );
          })}
        </UserContents>
      </UserS>
      <Ranking>
        <RankingTitle>
            <Nemo/>
          <Text
          is_bold
          is_margin="0 20px 0 0 "
          >오늘의 랭킹</Text>
          

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
            <DdongGraMe/>
            <Text>{leader_board[0].id}</Text>
            <Text>{leader_board[0].point}</Text>
            </Leader>
            <Leader>
            <DdongGraMe/>
            <Text>{leader_board[1].id}</Text>
            <Text>{leader_board[1].point}</Text>
            </Leader>
            <Leader>
            <DdongGraMe/>
            <Text>{leader_board[2].id}</Text>
            <Text>{leader_board[2].point}</Text>
            </Leader>
            </SuperLeaders>
            <LeaderSlider list={leader_board}/>
          </LeaderBoard>
        </RankingTitle>
        <UserContents>
          {user_leaders.map((p, idx) => {
            return (
              <UserContent key={idx}>
                <Userurl />
                <Text is_size="15px" is_color="black">{`${p.id}`}</Text>
              </UserContent>
            );
          })}
        </UserContents>
        <Text
            _onClick={() => {
              openModal();
            }}
            is_bold 
          >
            더보기⇑{" "}
          </Text>
      </Ranking>
    </Container>
  );
};
const Container = styled.div`
display : flex;
margin : 0 auto;
width : 600px;
max-widt : 600px;  
justify-content: space-between;
`;
const UserS = styled.div`

  height: 100px;
  max-height: 100px;
  display: flex;
`;
const Ranking = styled.div`
  height: 100px;
  display: flex;
`;
const UserContents = styled.div`
  height: 100px;
  overflow-y: auto;
overflow-x: hidden;
`;
const UserContent = styled.div`
  height: 30px;
  display: flex;
`;
const Userurl = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 20px;
  background-color: gray;
`;
const RankingTitle = styled.div`
  display: flex;
`;
const Nemo = styled.div`
width : 15px;
height : 15px;
background-color : #94d7bb;
margin : 4px 3px 0 0;
`;
const LogoWrap = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  right :600px;
  bottom : 180px;
`;
const LogoImg = styled.img`
  width: 200px;
  height: 100px;
`;
const DdongGraMe= styled.div`
width : 50px;
height : 50px;
border-radius : 50px;
border : solid 2px black;
`;
const SuperLeaders= styled.div`
display: flex;
justify-content: space-around;
width : 500px;
padding : 0 60px ;

`;
const Leader =styled.div`
text-align: center;
`;
export default MainFooter;
