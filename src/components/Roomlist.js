import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Text, Button } from "../elements/index";
import LeaderBoard from "./LeaderBoard";
import { actionCreators as roomActions } from "../redux/modules/room";

const Roomlist = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState("");

  const room_list = useSelector((state) => state.room.list);
  const room_info = useSelector((state) => state.room.roomInfo);
  const userId = localStorage.getItem("userId");

 
  console.log("room_info", room_info);


  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const changeRadioQ1 = (e) => {
    setState(e.target.value);
    console.log(e.target.value);
  };
  const joinWaiting = () => {
    console.log(state)
    if(state === ""){
      alert("선택해주세요~~!")
    }else{
    dispatch(
      roomActions.joinRoomDB({
        roomNum: room_info.roomNum,
        id: userId,
        state: state,
      })
    );
  }
  };

  useEffect(() => {
    dispatch(roomActions.getRoomListDB());
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
                  is_width="120px"
                  is_height="50px"
                  disabled={n.state == "wait" ? false : true}
                  is_hover="inset -4.5em 0 0 0 #94d7bb, inset 4.5em 0 0 0 #94d7bb"
                  _onClick={() => {
                    openModal();
                    dispatch(roomActions.getRoomInfoDB(n.roomNum));
                  }}
                >
                  <Text>대기실 입장</Text>
                </Button>
              </TdS>
            </Tr>
          );
        })}
      </Tbody>
      <LeaderBoard
        open={modalOpen}
        close={closeModal}
        header={room_info.roomName}
        enterName="대기실 입장"
        enter={joinWaiting}
      >
        <WaitingEnterRadio>
          <Radio>
          <div>
            <Text
            is_margin="0 0 0 4px;"
            >blackPlayer</Text>
            <Text
            is_margin="5px 0 0 20px"
            > 현재 {room_info.blackTeamPlayer?1:0} 명</Text>
            </div>
            <Input>
            <input
              type="radio"
              id="1"
              name="state"
              value="blackPlayer"
              onChange={changeRadioQ1}
              disabled={room_info.blackTeamPlayer?true:false}
            />
            </Input>
          </Radio>

          <Radio>
          <div>
            <Text
            is_margin="0 0 0 10px;"
            >whitePlayer</Text>
               <Text
               is_margin="5px 0 0 20px"
               > 현재 {room_info.whiteTeamPlayer?1:0} 명</Text>
               </div>
            <Input>
            <input
              type="radio"
              id="2"
              name="state"
              value="whitePlayer"
              onChange={changeRadioQ1}
              disabled={room_info.whiteTeamPlayer?true:false}
            />
            </Input>
          </Radio>

          <Radio>
          <div>
            <Text
            is_margin="0 0 0 10px;"
            >blackObserver</Text>
            <Text
            is_margin="5px 0 0 20px"
            > 현재 {room_info.blackTeamObserver?room_info.blackTeamObserver.length:0} 명</Text>
            </div>
            <Input>
            <input
              type="radio"
              id="3"
              name="state"
              value="blackObserver"
              onChange={changeRadioQ1}
            />
            </Input>
          </Radio>

          <Radio>
            <div>
            <Text
             is_margin="0 0 0 10px;"
            >whiteObserver</Text>
             <Text
             is_margin="5px 0 0 20px"
             > 현재 {room_info.whiteTeamObserver ? room_info.whiteTeamObserver.length:0} 명</Text>
             </div>
            <Input>
            <input
              type="radio"
              id="4"
              name="state"
              value="whiteObserver"
              onChange={changeRadioQ1}
            />
            </Input>
          </Radio>
        </WaitingEnterRadio>
        <></>
      </LeaderBoard>
    </Table>
  );
};
const Table = styled.table`
  width: 1000px;
  border-radius: 15px 15px 0 0;
  background-color: #f2f2f2;
  border-bottom: 3px solid black;
  
`;
const Thead = styled.thead`
  background-color: #94d7bb;
  width : 1000px;
  height: 50px;
 
  
`;
const Tbody = styled.tbody`
  background-color: #f2f2f2;
 
`;
const Tr = styled.tr`
  height: 50px;
  
 
 
`;
const Th = styled.th`
  border-bottom: 1px solid black;
  border-radius: 15px 0px 0 0;
`;
const TdR = styled.td`
  border-bottom: 1px solid black;
  text-align: center;
  
`;
const TdP = styled.td`
  border-bottom: 1px solid black;
  text-align: center;
`;
const TdO = styled.td`
  border-bottom: 1px solid black;
  text-align: center;
`;
const TdS = styled.td`
  text-align: center;
  border-bottom: 1px solid black;
  border-radius: 0px 15px 0 0;  
`;

const WaitingEnterRadio = styled.div`
  display: flex;
`;
const BlackPlayer = styled.input.attrs({ type: "radio" })``;
const WlackPlayer = styled.input.attrs({ type: "radio" })``;
const BlackObserver = styled.input.attrs({ type: "radio" })``;
const WhiteObserver = styled.input.attrs({ type: "radio" })``;

const Radio = styled.div`
  border-right: solid 1px black;
  display: flex;
  height: 40px;
`;
const Input =styled.div`
 padding : 3px 0 0 0;
`;

export default Roomlist;
