import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import {Button ,Text} from "../elements/index";
import Roomlist from "../components/Roomlist";
import UsersInfo from "../components/UsersInfo";

const Main = () => {
  return (
    <Container>
      <UsersInfo />
    
      <Button
        is_width="100px"
        is_height="50px"
        _onClick={() => {
          history.push("/game");
        }}
      >
        게임
      </Button>
      <>
      <>
        <Text>12개의 게임방</Text>
        <Button
        is_width ="100px"
        is_height = "20px"
        >방만들기</Button>
        </>
        <Roomlist />
        </>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;

export default Main;
