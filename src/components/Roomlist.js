import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Text, Button } from "../elements/index";
import RoomEnter from "./RoomEnter";
import { actionCreators as roomActions } from "../redux/modules/room";

const Roomlist = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState("");

  const room_list = useSelector((state) => state.room.list);
  const room_info = useSelector((state) => state.room.roomInfo);
  const userId = localStorage.getItem("userId");
  console.log("room_list",room_list);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const changeRadioQ1 = (e) => {
    setState(e.target.value);
  };
  const joinWaiting = () => {
    if (!room_info.roomNum) {
      alert("없는 방입니다~!");
      window.location.reload();
      return;
    }
    if (state === "") {
      alert("선택해주세요~~!");
      return;
    }

    dispatch(
      roomActions.joinRoomDB({
        roomNum: room_info.roomNum,
        id: userId,
        state: state,
      })
    );
  };

  

  useEffect(() => {
  
    dispatch(roomActions.getRoomListDB(userId));
  }, []);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>방번호</Th>
          <TdR>방이름</TdR>
          <TdP>플레이어</TdP>
          <TdO>관전자</TdO>
          <TdS>상태</TdS>
        </Tr>
      </Thead>
      <Tbody>
        {room_list.map((n, idx) => {
          return (
            <Tr key={idx}>
              <Th>{n.roomNum}</Th>
              <TdR>{n.roomName}</TdR>
              <TdP>{n.playerCnt}</TdP>
              <TdO>{n.observerCnt}</TdO>
              <TdS>
                <Button
                  is_border="2px solid #f2f2f2"
                  is_background="transparent"
                  is_width="120px"
                  is_height="50px"
                  disabled={n.state == "wait" ? false : true}
                  is_hover="inset -4.5em 0 0 0 #94d7bb, inset 4.5em 0 0 0 #94d7bb"
                  _onClick={() => {
                    dispatch(roomActions.getRoomInfoDB(n.roomNum));
                    openModal();
                  }}
                >
                  <Text>방 입장</Text>
                </Button>
              </TdS>
            </Tr>
          );
        })}
      </Tbody>
      <RoomEnter
        open={modalOpen}
        close={closeModal}
        header="방 입장하기"
        enterName="방 입장"
        enter={joinWaiting}
      >
        <WaitingEnterRadio>
          <Item>
            <RadioButtonBP
              type="radio"
              id="1"
              name="state"
              value="blackPlayer"
              onChange={changeRadioQ1}
              disabled={room_info.blackTeamPlayer ? true : false}
            />
            <RadioButtonLabelBP for="1">
            <div>
              <Text is_margin="0 0 0 2px"
              is_bold
              is_color="white"
              >Black Player</Text>
              <Text is_margin="5px 0 0 0"
              is_bold
              is_color="white"
              >
                현재 {room_info.blackTeamPlayer ? 1 : 0} 명
              </Text>
              </div>
            </RadioButtonLabelBP>
          </Item>

          <Item>
            <RadioButtonWP
              type="radio"
              id="2"
              name="state"
              value="whitePlayer"
              onChange={changeRadioQ1}
              disabled={room_info.whiteTeamPlayer ? true : false}
            />
            <RadioButtonLabelWP for="2">
            <div>
              <Text is_margin="0 0 0 2px"
              is_bold
              is_color="white"
              >White Player</Text>
              <Text is_margin="5px 0 0 0"
              is_bold
              is_color="white"
              >
                현재 {room_info.whiteTeamPlayer ? 1 : 0} 명
              </Text>
              </div>
            </RadioButtonLabelWP>
          </Item>

          <Item>
            <RadioButtonBO
              type="radio"
              id="3"
              name="state"
              value="blackObserver"
              onChange={changeRadioQ1}
            />
            <RadioButtonLabelBO for="3">
            <div>
              <Text is_margin="0 0 0 2px"
              is_bold
              >Black Observer</Text>
              <Text is_margin="5px 0 0 0"
              is_bold>
                현재
                {room_info.blackTeamObserver
                  ? room_info.blackTeamObserver.length
                  : 0}
                명
              </Text>
              </div>
            </RadioButtonLabelBO>
          </Item>

          <Item>
            <RadioButtonWO
              type="radio"
              id="4"
              name="state"
              value="whiteObserver"
              onChange={changeRadioQ1}
            />
            <RadioButtonLabelWO for="4">
              <div>
                <Text is_margin="0 0 0 2px"
                is_bold
                is_color="#94D7BB"
                >White Observer</Text>
                <Text is_margin="5px 0 0 0"
                is_bold
                is_color="#94D7BB"
                >
                  현재
                  {room_info.whiteTeamObserver
                    ? room_info.whiteTeamObserver.length
                    : 0}
                  명
                </Text>
              </div>
            </RadioButtonLabelWO>
          </Item>
        </WaitingEnterRadio>
        <></>
      </RoomEnter>
    </Table>
  );
};
const Table = styled.table`
  width: 100%;
  border-radius: 15px 15px 0 0;
  background-color: #f2f2f2;
  border-bottom: 3px solid black;
`;
const Thead = styled.thead`
  background-color: #94d7bb;
  width: 100%;
  height: 50px;
`;
const Tbody = styled.tbody`
  background-color: #f2f2f2;
`;
const Tr = styled.tr`
  height: 50px;
  width: 100%;
`;
const Th = styled.th`
  border-bottom: 1px solid black;
  border-radius: 15px 0px 0 0;
  width: 10%;
`;
const TdR = styled.td`
  border-bottom: 1px solid black;
  text-align: center;
  width: 50%;
`;
const TdP = styled.td`
  border-bottom: 1px solid black;
  text-align: center;
  width: 10%;
`;
const TdO = styled.td`
  border-bottom: 1px solid black;
  text-align: center;
  width: 10%;
`;
const TdS = styled.td`
  text-align: center;
  border-bottom: 1px solid black;
  border-radius: 0px 15px 0 0;
  width: 20%;
`;

const WaitingEnterRadio = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;


const Item = styled.div`
  display: flex;
  width: 35%;
  height: 20%;
  margin: 0;
  align-items: center;
  box-sizing: border-box;
  border-radius: 2px;
`;
const RadioButtonLabelBP = styled.label`
  width: 79%;
  height: 70px;
  border: 2px solid 94D7BB;
  border-radius: 15px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RadioButtonBP = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:hover ~ ${RadioButtonLabelBP} {
    box-shadow: -5px 5px 4px 0px rgba(0, 0, 0, 0.25);
    &::after {
      color: white;
    }
  }
  &:checked {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
  }
  &:checked + ${Text} {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
    font-color : black;
  }
  &:checked + ${Item} {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
  }
  &:checked + ${RadioButtonLabelBP} {
    background: #E5E5E5;
    border: 1px solid #E5E5E5;
    &::after {
      color: white;
      margin: 4px;
    }
  }
`;
const RadioButtonLabelWP = styled.label`
  width: 79%;
  height: 70px;
  border: 2px solid black;
  border-radius: 15px;
  background-color: #94D7BB;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RadioButtonWP = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:hover ~ ${RadioButtonLabelWP} {
    box-shadow: -5px 5px 4px 0px rgba(0, 0, 0, 0.25);
    &::after {
      color: white;
    }
  }
  &:checked {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
  }
  &:checked + ${Item} {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
  }
  &:checked + ${RadioButtonLabelWP} {
    background: #E5E5E5;
    border: 1px solid #E5E5E5;
    &::after {
      color: white;
      margin: 4px;
    }
  }
`;
const RadioButtonLabelBO = styled.label`
  width: 79%;
  height: 70px;
  border: 2px solid black;
  border-radius: 15px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RadioButtonBO = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:hover ~ ${RadioButtonLabelBO} {
    box-shadow: -5px 5px 4px 0px rgba(0, 0, 0, 0.25);
    &::after {
      color: white;
    }
  }
  &:checked {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
  }
  &:checked + ${Item} {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
  }
  &:checked + ${RadioButtonLabelBO} {
    background: #E5E5E5;
    border: 1px solid #E5E5E5;
    &::after {
      color: white;
      margin: 4px;
    }
  }
`;
const RadioButtonLabelWO = styled.label`
  width: 79%;
  height: 70px;
  border: 2px solid black;
  border-radius: 15px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RadioButtonWO = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:hover ~ ${RadioButtonLabelWO} {
    box-shadow: -5px 5px 4px 0px rgba(0, 0, 0, 0.25);
    &::after {
      color: white;
    }
  }
  &:checked {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
  }
  &:checked + ${Item} {
    background: #E5E5E5;
    border: 2px solid #E5E5E5;
  }
  &:checked + ${RadioButtonLabelWO} {
    background: #E5E5E5;
    border: 1px solid #E5E5E5;
    &::after {
      color: white;
      margin: 4px;
    }
  }
`;
export default Roomlist;
