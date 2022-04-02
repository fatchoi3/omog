import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';

import { Button, Text } from "../elements/index";
import Roomlist from "../components/Roomlist";
import UsersInfo from "../components/UsersInfo";
import MainFooter from "../components/MainFooter";
import Spinner from "../elements/Spinner";
import RoomMake from "../components/RoomMake";
import useInput from "../hook/useInput";
import GameInfo from "../components/GameInfo";


import Time from "../pictures/Time.png";

import useSocket from "../hook/useSocket2";

import { useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";

import { useHistory } from "react-router-dom";

import "../components/lobby.css"

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [infoOpen, setInfo]= useState(false);
  const [roomaName, onChangeRoomaName, setRoomaName] = useInput("");
  const [roomNum, onChangeRoomNum, setRoomNum] = useInput("");
  const [state, setState] = useState("2 : 00");
  const [color, setColor] = useState("1");
 

  const userId = localStorage.getItem("userId");
  const is_token = userId ? true : false;

  const [socket, disconnectSocket] = useSocket(
    "https://haksae90.shop/lobby",
    -1,
    userId
  );
  
  //모달창켜기
  const openModal = () => {
    setModalOpen(true);
  };

  //모달창끄리
  const closeModal = () => {
    setModalOpen(false);
  };
  //모달창켜기
  const openInfo = () => {
    setInfo(true);
  };

  //모달창끄리
  const closeInfo = () => {
    setInfo(false);
  };

  //방만들어 입장
  const enterWaiting = () => {
    if ((roomaName === "" || state === "")||color==="") {
      Swal.fire({
        title: '모두 채워주세요!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return;
    }
    dispatch(roomActions.addRoomDB(roomaName, state,color));
  };

  const enterNum = () => {
    if (roomNum === "") {
      Swal.fire({
        title: '모두 채워주세요!',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
    dispatch(roomActions.numJoinDB({ id: userId, roomNum: roomNum }));
  };

  const changeRadioQ1 = (e) => {
    setState(e.target.value);
  };
  const changeRadioQ2 = (e) => {
    console.log("e",e.target.value)
    setColor(e.target.value);
  };

  //엔터키 작동 방만들기
  const onKeyPress = useCallback((e) => {
    if (e.key == "Enter") {
      enterWaiting();
    }
  });

  //엔터키 작동 방번호로 들어가기
  const onKeyPressNum = useCallback((e) => {
    if (e.key == "Enter") {
      enterNum();
    }
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);

  useEffect(() => {
    socket.emit("lobby", userId);
  }, []);

  if (!is_token) {
    return (
      <Getout>
        <Text is_size="1.87vw" is_margin="1.17vw auto" is_bold>
          앗 잠깐!
        </Text>
        <Text is_size="0.94vw" is_margin="1.17vw auto">
          {" "}
          로그인 후에만 이용할 수 있어요!
        </Text>
        <Button
          is_width="17.57vw"
          is_height="5.86vw"
          is_margin="0.29vw 5.86vw"
          is_radius="0.53vw"
          is_border="none"
          is_background="#94d7bb"
          is_cursor
          is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
          _onClick={() => {
            history.replace("/");
          }}
        >
          <Text is_size="1.87vw" is_margin="1.17vw auto" is_bold>
            {" "}
            로그인 하러가기
          </Text>
        </Button>
      </Getout>
    );
  }

  return (
    <>
      

      <Container>
        {loading ? <Spinner type={"page"} is_dim={true} width="11.72vw" /> : ""}
        <ListDiv>
          <ListTitle>
            <ListTip>
              <Button
                is_height="1.76vw"
                is_width="1.76vw"
                is_margin="0.29vw 0 0 0"
                is_background="transparent"
                _onClick={() => {
                  window.location.reload();
                }}
              >
                <Text is_size="0.88vw">↻</Text>
              </Button>
              <Text is_size="1.76vw" is_margin="0.59vw 0 0 0.35vw" is_bold>
                게임방
              </Text>
              <Text is_size="1.17vw" is_margin="0.59vw 0 0 2.93vw" is_bold is_cursor _onClick={()=>{openInfo()}} >
                 게임 방법?
                 </Text>
              <GameInfo
               open={infoOpen}
               close={closeInfo}
              />
            </ListTip>
            <RoomFind>
              <Text
                is_size="0.88vw"
                is_width="2.64vw"
                is_margin="0.59vw 0.41vw 0 0 "
                is_color="gray"
                is_bold
              >
                방번호
              </Text>
              <RoomInput
                placeholder="숫자만..."
                name="roomNum"
                onKeyDown={(e) => onKeyPressNum(e)}
                onChange={(e) => onChangeRoomNum(e)}
                value={roomNum}
                id="outlined-multiline-static"
                variant="outlined"
                label="roomNum"
              />
              <Button
                is_background="transparent"
                is_margin="0.23vw 0.59vw 0 0 "
                is_height="1.76vw"
                is_width="1.76vw"
                is_border="none"
                _onClick={() => {
                  enterNum();
                }}
              >
                <Text is_size="1.46vw">🔍</Text>
              </Button>
            </RoomFind>
          </ListTitle>
          <RoomDiv>
            <Roomlist />
          </RoomDiv>
        </ListDiv>
        <UserInfoWrap>
          <UsersInfo />
          <ButtonWrap>
            <Button
              is_margin="0.29vw auto"
              is_height="4.1vw"
              is_width="11.72vw"
              is_radius="1.17vw"
              is_border=" solid 0.12vw black"
              is_background="#94d7bb"
              is_cursor
              is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
              _onClick={() => {
                openModal();
              }}
            >
              <Text is_size="1.05vw" is_bold is_color="black">
                방 만들기
              </Text>
            </Button>
            <Button
              is_margin="0.29vw auto"
              is_height="4.1vw"
              is_width="11.72vw"
              is_radius="1.17vw"
              is_border=" solid 0.12vw black"
              is_background="#94d7bb"
              is_cursor
              is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
              _onClick={() => {
                dispatch(roomActions.quickStartPlayer(userId));
              }}
            >
              <Text is_size="1.05vw" is_color="black" is_bold>
                플레이어 빠른 참가!
              </Text>
            </Button>
            <Button
              is_margin="0.29vw auto"
              is_height="4.1vw"
              is_width="11.72vw"
              is_radius="1.17vw"
              is_border=" solid 0.12vw black"
              is_background="#94d7bb"
              is_cursor
              is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
              _onClick={() => {
                dispatch(roomActions.quickStartObserver(userId));
              }}
            >
              <Text is_size="1.05vw" is_color="black" is_bold>
                관전자 빠른 참가!
              </Text>
            </Button>
           
          </ButtonWrap>
        </UserInfoWrap>

        <RoomMake
          open={modalOpen}
          close={closeModal}
          header="방 만들기"
          enter={enterWaiting}
          enterName="방 만들기"
        >
          <ModalFlex>
            <Front>
              <RoomNameTitle>
                <RoomName>
                  <Text is_bold>방 이름</Text>
                </RoomName>
                <MakeRomm
                  name="message"
                  onKeyDown={(e) => onKeyPress(e)}
                  onChange={(e) => onChangeRoomaName(e)}
                  placeholder="what...?"
                  value={roomaName}
                  id="outlined-multiline-static"
                  variant="outlined"
                  label="Message"
                />
              </RoomNameTitle>
              <TimeChoiceTitle>
                <TimeChoice>
                  <Text is_bold>시간</Text>
                </TimeChoice>

                <WaitingEnterRadio>
                  <div className="TBTN">
                    <RadioButton
                      type="radio"
                      id="1"
                      name="state"
                      value="2 : 00"
                      checked={state === "2 : 00" ? "checked" : ""}
                      onChange={changeRadioQ1}
                    />
                    <RadioButtonLabel for="1">
                      <Text is_size="1.46vw" >2: 00</Text>
                    </RadioButtonLabel>
                  </div>

                  <div className="TBTN">
                    <RadioButton
                      type="radio"
                      id="2"
                      name="state"
                      value="3 : 00"
                      checked={state === "3 : 00" ? "checked" : ""}
                      onChange={changeRadioQ1}
                    />
                    <RadioButtonLabel htmlFor="2">
                      <Text is_size="1.46vw">3: 00</Text>
                    </RadioButtonLabel>
                  </div>
                  <div className="TBTN">
                    <RadioButton
                      type="radio"
                      id="3"
                      name="state"
                      value="5 : 00"
                      onChange={changeRadioQ1}
                    />
                    <RadioButtonLabel for="3">
                      <Text is_size="1.46vw">5: 00</Text>
                    </RadioButtonLabel>
                  </div>
                </WaitingEnterRadio>
              </TimeChoiceTitle>
              <ColorChoice>
                <ColorTitle><Text is_bold>오목판</Text>  </ColorTitle>
                
                  <ColorRadio
                  type="radio"
                  id="11"
                  name="color"
                  value="1"
                  checked={color ==="1"?"checked":""}
                  onChange={changeRadioQ2}/>
                  <Color for="11" color="#E08C4F"/>
                  <ColorRadio
                type="radio"
                id="22"
                name="color"
                value="2"
                onChange={changeRadioQ2}
                />
                <Color for="22" color="#D3EAE0"/>
                 
                 <ColorRadio
                type="radio"
                id="33"
                name="color"
                value="3"
                onChange={changeRadioQ2}
                />
                <Color for="33" color="#FFD7E7"/>
                  

                  <ColorRadio
                type="radio"
                id="44"
                name="color"
                value="4"
                onChange={changeRadioQ2}
                />
                <Color for="44" color="#D9E4F4"/>
                  
                  
                 <ColorRadio
                type="radio"
                id="55"
                name="color"
                value="5"
                onChange={changeRadioQ2}
                />
                <Color for="55" color="#DDDDDD"/>
                  
                  <ColorRadio
                type="radio"
                id="66"
                name="color"
                value="6"
                onChange={changeRadioQ2}
                />
                <Color for="66" color="#8E8E8E"/>
                  
                
              </ColorChoice>
            </Front>
            <TimeImg>
              <Text is_size="2.34vw" is_bold is_margin="0 10% 0 0">
                {" "}
                {state ? state : ""}
              </Text>
            </TimeImg>
          </ModalFlex>
        </RoomMake>
      </Container>
      <MainFooter />
    </>
  );
};
//
const Getout = styled.div`
  width: 29.29vw;
  height: 17.57vw;
  margin: 11.72vw auto;
  padding: 2.93vw;
  background-color: #f2f2f2;
`;
const Container = styled.div`
  display: flex;
  width: 96.66vw;
  margin : 0 1.67vw 0;
  padding-top : 1.2vw;
  box-sizing : border-box;
`;
const UserInfoWrap = styled.div`
  width: 23.43vw  ;
`;
const RoomDiv = styled.div`
  height: 34vw;
  width: 70.3vw;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 1.05vw;
  margin: 0.88vw 0 0 0;
  background-color: white;
  border: 0.12vw solid black;
  ::-webkit-scrollbar {
    display: none;
  }
  box-shadow: -0.29vw 0.29vw 0.23vw 0vw rgba(0, 0, 0, 0.25);
`;
const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.34vw;
  width: 72.06vw;
`;
const ListDiv = styled.div`
  margin: 0 0.29vw 0 0;
  width: 70.3vw;
  height: 38.08vw;
`;
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 23.43vw;
  height: 23.43vw;
`;
const ListTip = styled.div`
  display: flex;
`;

const MakeRomm = styled.input`
  width: 100%;
  height: 50%;

  border: 0.12vw black solid;
  background-color: #ffffff;
  padding-left: 1.46vw;
  border-radius: 0.88vw;
  ::placeholder {
    font-size: 1.05vw;
  }
  :focus {
    outline: 0.12vw black solid;
  }
  @media (max-width: 44.93vw) {
    width: 17.57vw;
    ::placeholder {
      padding: 0vw 1.17vw;
      font-size: 0.94vw;
    }
  }
`;
const ModalFlex = styled.div`
  display: flex;
  margin: 0.29vw 0 0.88vw 0;
  width: 100%;
  height: 100%;
`;
const RoomFind = styled.div`
  display: flex;
  width: 14.65vw;
`;
const RoomInput = styled.input`
  width: 7.03vw;
  height: 1.76vw;
  border: 0.12vw solid gray;
  background-color: #e1e1e1;
  border-radius: 0.88vw;
`;

const WaitingEnterRadio = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 6.7% 0 0 0;
`;

const TimeImg = styled.div`
  background-image: url(${Time});
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
  width: 50%;
  margin: 2% 7% 2% 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RoomNameTitle = styled.div`
  display: flex;
  width: 100%;
  height: 33%;
  align-items: center;
`;
const RoomName = styled.div`
  width: 20%;
  height: 50%;
  border: 0.12vw solid black;
  border-radius: 0.88vw;
  margin: 0 6% 0 0;

  background-color: #94d7bb;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TimeChoiceTitle = styled.div`
  display: flex;
  width: 100%;
  height: 33%;
  align-items: center;
`;
const TimeChoice = styled.div`
  width: 19%;
  height: 50%;
  border: 0.12vw solid black;
  border-radius: 0.88vw;
  margin: 0 4% 0 0;

  background-color: #94d7bb;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Front = styled.div`
  width: 100%;
  margin: 0 4%;
`;
const RadioButtonLabel = styled.label`
  width: 100%;
  height: 100%;
  z-index: 2;
  border-radius: 0.88vw;
  background-color: transparant;
  display: flex;
  align-items: center;
  justify-content: center;
  position : absolute;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:checked {
    background: #94d7bb;
    border: 0.12vw solid #94d7bb;
  }
  &:checked + ${RadioButtonLabel} {
    background: #94d7bb;
    border: 0.06vw solid #94d7bb;
    &::after {
      color: white;
      margin: 0.23vw;
    }
  }
`;

const ColorChoice = styled.div`
display: flex;
  width: 100%;
  height: 30%;
  align-items: center;
`;
const ColorTitle = styled.div`
width: 20%;
  height: 50%;
  border: 0.12vw solid black;
  border-radius: 0.88vw;
  margin: 0 0.59vw 0 0;

  background-color: #94d7bb;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Color= styled.label`
width : 2.34vw;
height : 2.34vw;
margin : 0.12vw 0.29vw;
border : 0.12vw solid black;
border-radius : 0.88vw;
background-color : ${(props)=>props.color};


`;
const ColorRadio= styled.input`
margin:0;
opacity: 0;
z-index: 1;
cursor: pointer;
&:checked {
  background: #94d7bb;
  border: 0.12vw solid #94d7bb;
  box-shadow: -0.29vw 0.29vw 0.23vw 0vw rgba(0, 0, 0, 0.25);
}
&:checked + ${Color} {
  box-shadow: -0.29vw 0.29vw 0.23vw 0vw rgba(0, 0, 0, 0.25);
}
`;
export default Main;
