import React from "react";
import styled, { keyframes } from "styled-components";
import { Text, Button } from "../../elements";
import { useDispatch} from "react-redux";
import { actionCreators as gameActions } from "../../redux/modules/game";
import useInput from "../../hook/useInput";

const ErrorModal = (props) => {
  const { open, close,  gameNum, gameInfo,userInfo } = props;
  const [message, onChangeMessage, setMessage] = useInput("");
  const dispatch = useDispatch();
 const result = {input : message,gameNum:gameNum, gameInfo: gameInfo,userInfo:userInfo};

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    <>
      {open ? (
        <OpenModal>
          <Section>
            <Header>
              <DDiv></DDiv>
              <RoomTitle>
                <Text is_bold is_size="1.76vw" is_margin="1.34vw 0 0 1.17vw">
                오류 보내기
                </Text>
              </RoomTitle>
              <Xbutton onClick={close}>✕</Xbutton>
            </Header>
            <Main>
                <Error>
                <Text is_size="1.05vw" is_bold is_margin=" 0.59vw 1.17vw 0 0">오류 내용 : </Text>
             <ErrorInput
              value={message}
              onChange={(e) => onChangeMessage(e)}
             />
            </Error>
                </Main>
                <Button 
                is_width="10.54vw"
                is_height="2.34vw" 
                is_margin="0 0 0.59vw 11.72vw"
                is_background="#94D7BB"
                is_size="1.05vw"
                is_border="none"
                is_radius="0.88vw"
                is_color="white"
                is_hover="inset -5em 0 0 0 #f0f0f0, inset 5em 0 0 0 #f0f0f0"
                _onClick={
                ()=>{ dispatch(gameActions.sendError(result))
                  close()
                }    
                }> 오류 보내기 </Button>
          </Section>
        </OpenModal>
      ) : null}
    </>
  );
};
const modal_bg_show = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}

`;
const modal_show = keyframes`
from {
  opacity: 0;
  margin-top: -2.93vw;
}
to {
  opacity: 1;
  margin-top: 0;
}
`;
const Section = styled.div`
  width: 35.79vw;
  height: 25.08vw;
  max-width: 58.58vw;
  max-height: 52.72vw;
  margin: 0 auto;
  border: 0.12vw solid black;
  border-radius: 1.4rem;
  background-color: #fff;

  animation: ${modal_show} 0.3s;
  overflow: hidden;
`;
const Header = styled.header`
width: 35.79vw;
  height: 3.86vw;
  padding: 0.47vw 0;
  background-color: #94d7bb;
  border-bottom: 0.12vw solid black;
  font-weight: 700;
  font-size: 1.46vw;
  display: flex;
  justify-content: space-between;
  color: white;
`;
const Main = styled.main`
  width: 35.79vw;
  height: 14.29vw;
  margin: 0 auto;
`;

const RoomTitle = styled.div`
  height: 2.93vw;
  width: 24.9vw;
  display: flex;
`;
const DDiv = styled.div`
  width: 15.5vw;
`;
const Xbutton = styled.button`
  width: 2.34vw;
  margin: 0 5%;
  font-size: 1.99vw;
  font-weight: 700;
  text-align: center;
  color: white;
  border: none;
  background-color: transparent;
`;

const OpenModal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  animation: ${modal_bg_show} 0.3s;
`;
const ErrorInput = styled.textarea`
 width : 17.57vw;
 height : 8.79vw;
 resize:none;
 font-size : 1.17vw;
 border-radius : 0.88vw;
 border: 0.12vw solid black;
 padding : 1.17vw;
`;
const Error = styled.div`
display: flex;
width : 29.29vw;
height : 11.72vw;
margin : 2.93vw 0 0 2.93vw;
padding : 0.59vw 0 0 1.17vw;
box-sizing : border-box;
`;
export default ErrorModal;
