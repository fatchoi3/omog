import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { Text } from "../elements/index";

import Progress from "./Progress";
import LeaderBoard from "./LeaderBoard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const UsersInfo = () => {
  const dispatch=useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const get_user = useSelector((state)=>state.user.userInfo);
  const user_list = useSelector((state)=>state.user.list);
  const user_leaders = useSelector((state)=>state.user.leader_list);
  const leader_board = useSelector((state)=>state.user.leader_board);
  const userId = localStorage.getItem("userId");

  // console.log("get_user",get_user.score[0].win);
  ;
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const win = get_user.score[0].win;
  const lose = get_user.score[1].lose;
  


  useEffect(()=>{
    dispatch(userActions.getUserDB());
    dispatch(userActions.getLeaderDB());
    dispatch(userActions.getLeaderBoardDB());
    dispatch(userActions.loginCheckDB(userId));
  },[]);
  return (
    <UserInfoContainer>
      <User>
        {get_user.id}
        <Progress win={win} lose={lose} />
        <UserScore>
          <p>승률 {(win / (win + lose))? (win / (win + lose)) * 100 + "%" : 0 +"%"}</p>
          <p>
            (전체 {win}승 {lose}패)
          </p>
        </UserScore>
        <Text> Point {get_user.point} P</Text>
      </User>
      <UserS>
        <p>현재 접속 유저</p>
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
          <Text>오늘의 랭킹</Text>
          <Text
            _onClick={() => {
              openModal();
            }}
          >
            더보기+{" "}
          </Text>

          <LeaderBoard
            open={modalOpen}
            close={closeModal}
            header="Modal heading"
          >
            {" "}
            {leader_board.map((p, idx) => {
              return (
                <UserContent key={idx}>
                  <Userurl />
                  <Text
                    is_size="15px"
                    is_color="black"
                  >{`${p.id}`}</Text>
                </UserContent>
              );
            })}
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
      </Ranking>
    </UserInfoContainer>
  );
};
const UserInfoContainer = styled.div`
  height: 800px;
  width: 200px;
`;
const User = styled.div`
  height: 30%;
`;
const UserS = styled.div`
  height: 30%;
`;
const Ranking = styled.div`
  height: 30%;
`;
const UserContents = styled.div`
  height: 30px;
`;
const UserContent = styled.div`
  height: 30px;
  display: flex;
`;
const Userurl = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  background-color: gray;
`;
const RankingTitle = styled.div`
  display: flex;
`;
const UserScore = styled.div`
  display: flex;
`;
export default UsersInfo;
