import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import {Button ,Text} from "../elements/index";
import Roomlist from "../components/Roomlist";
import UsersInfo from "../components/UsersInfo";

const Main = () => {
  return (
    <Container>
         <UserInfoWrap>
      <UsersInfo />
      </UserInfoWrap>
      <ListDiv>
      <ListTitle>
          <Button
          is_height="30px"
          is_width="30px"
          >
              <Text
              is_size="15px"
              >↻</Text>
          </Button>
        <Text>12개의 게임방</Text>
        <Button
        is_width ="100px"
        is_height = "35px"
        _onClick={() => {
            history.push("/game");
          }}
        >방만들기</Button>
        </ListTitle>
        <RoomDiv>
        <Roomlist />
        </RoomDiv>
        <ButtonWrap>
            <Button
            is_margin="0 10px"
            is_height="50px"
            is_width="200px"
            >  방 번호 입력  </Button>
            <Button
            is_margin="0 10px"
            is_height="50px"
            is_width="200px"
            > 플레이어 빠른 참가 </Button>
            <Button
            is_margin="0 10px"
            is_height="50px"
            is_width="200px"
            > 관전자 빠른 참가 </Button>
        </ButtonWrap>
        </ListDiv>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  width: 800px;
  margin : 80px 100px;
`;
const UserInfoWrap = styled.div`
width : 200px;

`;
const RoomDiv = styled.div`
 height : 600px;
 width : 1000px;
 overflow-y: auto;
 overflow-x: hidden;
`;
const ListTitle = styled.div`
display: flex;
`;
const ListDiv =styled.div`

`;
const ButtonWrap = styled.div`
display: flex;
`;

export default Main;
