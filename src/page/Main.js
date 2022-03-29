import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { Button, Text } from "../elements/index";
import Roomlist from "../components/Roomlist";
import UsersInfo from "../components/UsersInfo";
import MainFooter from "../components/MainFooter";
import Spinner from "../elements/Spinner";
import RoomMake from "../components/RoomMake";
import useInput from "../hook/useInput";

import exit from "../pictures/exit.png";
import Logo from "../pictures/omogLogo.png";
import Time from "../pictures/Time.png";

import useSocket from "../hook/useSocket";

import { useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import { actionCreators as userActions } from "../redux/modules/user";
import { useHistory } from "react-router-dom";

import "../components/lobby.css"

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [roomaName, onChangeRoomaName, setRoomaName] = useInput("");
  const [roomNum, onChangeRoomNum, setRoomNum] = useInput("");
  const [state, setState] = useState("");
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

  //방만들어 입장
  const enterWaiting = () => {
    if (roomaName === "" || state === "") {
      alert("빈칸을 채워주세요");
      return;
    }
    dispatch(roomActions.addRoomDB(roomaName, state));
  };

  const enterNum = () => {
    if (roomNum === "") {
      alert("비어있습니다");
      return;
    }
    dispatch(roomActions.numJoinDB({ id: userId, roomNum: roomNum }));
  };

  const changeRadioQ1 = (e) => {
    setState(e.target.value);
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
        <Text is_size="32px" is_margin="20px auto" is_bold>
          앗 잠깐!
        </Text>
        <Text is_size="16px" is_margin="20px auto">
          {" "}
          로그인 후에만 이용할 수 있어요!
        </Text>
        <Button
          is_width="300px"
          is_height="100px"
          is_margin="5px 100px"
          is_radius="9px"
          is_border="none"
          is_background="#94d7bb"
          is_cursor
          is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
          _onClick={() => {
            history.replace("/");
          }}
        >
          <Text is_size="32px" is_margin="20px auto" is_bold>
            {" "}
            로그인 하러가기
          </Text>
        </Button>
      </Getout>
    );
  }

  return (
    <>
      <Button
        is_margin="1.5% 8% 1% "
        is_height="50px"
        is_width="150px"
        is_radius="8px"
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
        <ExitImg src={exit} />
        <Text is_size="20px" is_margin="7% 0 0 5%" is_color="#C4C4C4" is_bold>
          로그아웃
        </Text>
      </Button>

      <Container>
        {loading ? <Spinner type={"page"} is_dim={true} width="200px" /> : ""}
        {/* <Banner /> */}
        <ListDiv>
          <ListTitle>
            <ListTip>
              <Button
                is_height="30px"
                is_width="30px"
                is_margin="5px 0 0 0"
                is_background="transparent"
                _onClick={() => {
                  window.location.reload();
                }}
              >
                <Text is_size="15px">↻</Text>
              </Button>
              <Text is_size="30px" is_margin="10px 0 0 6px" is_bold>
                게임방
              </Text>
            </ListTip>
            <RoomFind>
              <Text
                is_size="15px"
                is_width="45px"
                is_margin="10px 7px 0 0 "
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
                is_margin="4px 10px 0 0 "
                is_height="30px"
                is_width="30px"
                is_border="none"
                _onClick={() => {
                  enterNum();
                }}
              >
                <Text is_size="25px">🔍</Text>
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
              is_margin="5% auto"
              is_height="100%"
              is_width="150px"
              is_radius="8px"
              is_border=" solid 2px black"
              is_background="#94d7bb"
              is_cursor
              is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
              _onClick={() => {
                openModal();
              }}
            >
              <Text is_bold is_color="black">
                방 만들기!
              </Text>
            </Button>
            <Button
              is_margin="5% auto"
              is_height="100%"
              is_width="150px"
              is_radius="8px"
              is_border=" solid 2px black"
              is_background="#94d7bb"
              is_cursor
              is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
              _onClick={() => {
                dispatch(roomActions.quickStartPlayer(userId));
              }}
            >
              <Text is_color="black" is_bold>
                플레이어 빠른 참가!
              </Text>
            </Button>
            <Button
              is_margin="5% auto"
              is_height="100%"
              is_width="150px"
              is_radius="8px"
              is_border=" solid 2px black"
              is_background="#94d7bb"
              is_cursor
              is_hover="inset -6em 0 0 0 #f0f0f0, inset 6em 0 0 0 #f0f0f0"
              _onClick={() => {
                dispatch(roomActions.quickStartObserver(userId));
              }}
            >
              <Text is_color="black" is_bold>
                관전자 빠른 참가!
              </Text>
            </Button>
            <LogoWrap>
              <LogoImg src={Logo} />
            </LogoWrap>
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
                      onChange={changeRadioQ1}
                    />
                    <RadioButtonLabel for="1">
                      <Text is_size="25px" >2: 00</Text>
                    </RadioButtonLabel>
                  </div>

                  <div className="TBTN">
                    <RadioButton
                      type="radio"
                      id="2"
                      name="state"
                      value="3 : 00"
                      onChange={changeRadioQ1}
                    />
                    <RadioButtonLabel for="2">
                      <Text is_size="25px">3: 00</Text>
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
                      <Text is_size="25px">5: 00</Text>
                    </RadioButtonLabel>
                  </div>
                </WaitingEnterRadio>
              </TimeChoiceTitle>
            </Front>
            <TimeImg>
              <Text is_size="40px" is_bold is_margin="0 10% 0 0">
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

const Getout = styled.div`
  width: 500px;
  height: 300px;
  margin: 200px auto;
  padding: 50px;
  background-color: #f2f2f2;
`;
const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 1% 8% 1% 8%;
`;
const UserInfoWrap = styled.div`
  width: 20%;
`;
const RoomDiv = styled.div`
  height: 500px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 18px;
  margin: 15px 0 0 0;
  background-color: #f2f2f2;
  border: 2px solid black;
  ::-webkit-scrollbar {
    display: none;
  }
  box-shadow: -5px 5px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 100%;
`;
const ListDiv = styled.div`
  margin: 0 5% 0 0;
  width: 70%;
`;
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 75%;
`;
const ListTip = styled.div`
  display: flex;
`;
const LogoWrap = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoImg = styled.img`
  width: 50%;
  height: 100%;
`;
const MakeRomm = styled.input`
  width: 100%;
  height: 50%;

  border: 2px black solid;
  background-color: #ffffff;
  padding-left: 25px;
  border-radius: 15px;
  ::placeholder {
    font-size: 18px;
  }
  :focus {
    outline: 2px black solid;
  }
  @media (max-width: 767px) {
    width: 300px;
    ::placeholder {
      padding: 0px 20px;
      font-size: 16px;
    }
  }
`;
const ModalFlex = styled.div`
  display: flex;
  margin: 5px 0 15px 0;
  width: 100%;
  height: 100%;
`;
const RoomFind = styled.div`
  display: flex;
  width: 250px;
`;
const RoomInput = styled.input`
  width: 120px;
  height: 30px;
  border: 2px solid gray;
  background-color: #e1e1e1;
  border-radius: 15px;
`;
const Item = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;

  position: relative;

  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 10px;
`;
const WaitingEnterRadio = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 10% 0 0 0;
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
  height: 40%;
  align-items: center;
`;
const RoomName = styled.div`
  width: 20%;
  height: 50%;
  border: 2px solid black;
  border-radius: 15px;
  margin: 0 6% 0 0;

  background-color: #94d7bb;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TimeChoiceTitle = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  align-items: center;
`;
const TimeChoice = styled.div`
  width: 19%;
  height: 50%;
  border: 2px solid black;
  border-radius: 15px;
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
  border-radius: 15px;
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
  &:hover ~ ${RadioButtonLabel} {
    // box-shadow: -5px 5px 4px 0px rgba(0, 0, 0, 0.25);
    &::after {
      color: white;
    }
  }
  &:checked {
    background: #94d7bb;
    border: 2px solid #94d7bb;
  }
  &:checked + ${Item} {
    background: #94d7bb;
    border: 2px solid #94d7bb;
  }
  &:checked + div {
    background-color: #94d7bb;
    border: 2px solid #94d7bb;
  }
  &:checked + ${RadioButtonLabel} {
    background: #94d7bb;
    border: 1px solid #94d7bb;
    &::after {
      color: white;
      margin: 4px;
    }
  }
`;
const ExitImg = styled.img`
  width: 35%;
  height: 70%;
`;

export default Main;
