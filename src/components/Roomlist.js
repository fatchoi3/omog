import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from 'sweetalert2';

import { Text, Button } from "../elements/index";
import RoomEnter from "./RoomEnter";
import { actionCreators as roomActions } from "../redux/modules/room";
import "./lobby.css"
const Roomlist = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState("");

  const room_list = useSelector((state) => state.room.list);
  const room_info = useSelector((state) => state.room.roomInfo);
  const userId = sessionStorage.getItem("userId");
  console.log("room_list", room_list);

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
      Swal.fire({
        title: '방이 없어요!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      window.location.reload();
      return;
    }
    if (state === "") {
      Swal.fire({
        title: '팀을 선택해주세요!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
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

  const aaa = () => {
    dispatch(roomActions.getRoomListDB(userId));
  };

  useEffect(() => {
    setInterval(aaa, 10000);
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
                <button 
                className="EBTN"
            
                  disabled={n.state == "wait" ? false : true}
                  onClick={() => {
                    dispatch(roomActions.getRoomInfoDB(n.roomNum));
                    openModal();
                  }}
                >
                 {n.state==="wait"? <Text>방 입장</Text>:<Text>게임중</Text> }
                </button>
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
          <div className="PBTNB">
            <RadioButtonBP
              type="radio"
              id="1"
              name="state"
              value="blackPlayer"
              onChange={changeRadioQ1}
              disabled={room_info.blackTeamPlayer ? true : false}
            />
            <RadioButtonLabelBP htmlFor="1">
              <div>
               <Text is_margin="0 0 0 0.12vw" is_bold is_color="white" is_stroke="0.04vw black" is_size="1.41vw">
                  Black Player
                </Text>
                <Text is_margin="0.59vw 0 0 0" is_bold is_color="black">
                  현재 {room_info.blackTeamPlayer ? 1 : 0} 명
                </Text>
              </div>
            </RadioButtonLabelBP>
          </div>

          <div className="PBTNW">
            <RadioButtonWP
              type="radio"
              id="2"
              name="state"
              value="whitePlayer"
              onChange={changeRadioQ1}
              disabled={room_info.whiteTeamPlayer ? true : false}
            />
            <RadioButtonLabelWP htmlFor="2">
              <div>
              <Text is_margin="0 0 0 0.12vw" is_bold is_color="white" is_stroke="0.05vw #94D7BB" is_size="1.41vw">
                  White Player
                </Text>
                <Text is_margin="0.29vw 0 0 0" is_bold is_color="#94D7BB">
                  현재 {room_info.whiteTeamPlayer ? 1 : 0} 명
                </Text>
              </div>
            </RadioButtonLabelWP>
          </div>

          <div className="PBTNB">
            <RadioButtonBO
              type="radio"
              id="3"
              name="state"
              value="blackObserver"
              onChange={changeRadioQ1}
            />
            <RadioButtonLabelBO htmlFor="3">
              <div>
              <Text is_margin="0 0 0 0.12vw" is_bold is_color="white" is_stroke="0.04vw black" is_size="1.41vw">
                  Black Observer
                </Text>
                <Text is_margin="0.29vw 0 0 0" is_bold>
                  현재
                  {room_info.blackTeamObserver
                    ? room_info.blackTeamObserver.length
                    : 0}
                  명
                </Text>
              </div>
            </RadioButtonLabelBO>
          </div>

          <div className="PBTNW">
            <RadioButtonWO
              type="radio"
              id="4"
              name="state"
              value="whiteObserver"
              onChange={changeRadioQ1}
            />
            <RadioButtonLabelWO htmlFor="4">
              <div>
              <Text is_margin="0 0 0 0.12vw" is_bold is_color="white" is_stroke="0.05vw #94D7BB" is_size="1.41vw">
                  White Observer
                </Text>
                <Text is_margin="0.29vw 0 0 0" is_bold is_color="#94D7BB">
                  현재
                  {room_info.whiteTeamObserver
                    ? room_info.whiteTeamObserver.length
                    : 0}
                  명
                </Text>
              </div>
            </RadioButtonLabelWO>
          </div>
        </WaitingEnterRadio>
        <></>
      </RoomEnter>
    </Table>
  );
};

const Table = styled.table`
  width: 70.3vw;
  border-radius: 0.88vw 0.88vw 0 0;
  background-color: white;
  border-bottom: 0.18vw solid black;
  font-size:0.94vw;
`;
const Thead = styled.thead`
  background-color: #94d7bb;
  width: 70.3vw;
  height: 2.93vw;
`;
const Tbody = styled.tbody`
  background-color: white;
  width : 70.3vw;
`;
const Tr = styled.tr`
  height: 3.51vw;
  width: 11.72vw;
`;
const Th = styled.th`
  border-bottom: 0.06vw solid black;
  border-right: 0.06vw solid black;
    border-radius: 0.88vw 0vw 0 0;
  width: 11.72vw;
  height: 3.51vw;
`;
const TdR = styled.td`
  border-bottom: 0.06vw solid black;
  border-right: 0.06vw solid black;
  text-align: center;
  width: 41.01vw;
  height: 3.51vw;
`;
const TdP = styled.td`
  border-bottom: 0.06vw solid black;
  border-right: 0.06vw solid black;
  text-align: center;
  width: 7.03vw;
  height: 3.51vw;
`;
const TdO = styled.td`
  border-bottom: 0.06vw solid black;
  border-right: 0.06vw solid black;
  text-align: center;
  width: 7.03vw;
  height: 3.51vw;
`;
const TdS = styled.td`
  text-align: center;
  border-bottom: 0.06vw solid black;
  border-radius: 0vw 0.88vw 0 0;
  width: 14.06vw;
  position: relative;
  height: 3.51vw;
`;

const WaitingEnterRadio = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;


const RadioButtonLabelBP = styled.label`
  width: 100%;
  height: 100%;
  border-radius: 0.88vw;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position : absolute;
`;

const RadioButtonBP = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
    &:checked {
    background: black;
    border: 0.12vw solid #e5e5e5;
  }
   &:checked + ${RadioButtonLabelBP} {
    background: black;
    border: 0.06vw solid #e5e5e5;
  }
`;
const RadioButtonLabelWP = styled.label`
width: 100%;
height: 100%;
border-radius: 0.88vw;
background-color: transparent;
display: flex;
align-items: center;
justify-content: center;
position : absolute;
`;
const RadioButtonWP = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:checked {
    background: #e5e5e5;
    border: 0.12vw solid #e5e5e5;
  }
  &:checked + ${RadioButtonLabelWP} {
    background: #94D7BB;
    border: 0.06vw solid #e5e5e5;
  }
`;
const RadioButtonLabelBO = styled.label`
width: 100%;
height: 100%;
border-radius: 0.88vw;
background-color: transparent;
display: flex;
align-items: center;
justify-content: center;
position : absolute;
`;
const RadioButtonBO = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:checked {
    background: #e5e5e5;
    border: 0.12vw solid #e5e5e5;
  }
  &:checked + ${RadioButtonLabelBO} {
    background: black;
    border: 0.06vw solid black;
   
  }
`;
const RadioButtonLabelWO = styled.label`
width: 100%;
height: 100%;
border-radius: 0.88vw;
background-color: transparent;
display: flex;
align-items: center;
justify-content: center;
position : absolute;
`;
const RadioButtonWO = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
 
  &:checked {
    background: #94D7BB;
    border: 0.12vw solid #e5e5e5;
  }
 
  &:checked + ${RadioButtonLabelWO} {
    background:#94D7BB;
    border: 0.06vw solid #e5e5e5;
    &::after {
      color: white;
      margin: 0.23vw;
    }
  }
`;
export default Roomlist;
