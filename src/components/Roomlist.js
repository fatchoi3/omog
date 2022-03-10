import { React, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {Text ,Button} from "../elements/index"
import LeaderBoard from "./LeaderBoard";
import { actionCreators as roomActions } from "../redux/modules/room";

const Roomlist = ()=>{
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [state , setState] = useState();
    const [disBut, setDisBut] = useState();
    const room_list = useSelector((state)=>state.room.list);
    const room_info = useSelector((state)=>state.room.roomInfo);
    const userId = localStorage.getItem("userId")
    
    console.log("room_list",room_list);
    console.log("room_info",room_info);
    console.log("userId",userId);


    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };
      const changeRadioQ1 = (e) => {
        setState(e.target.value)
        console.log(e.target.value);
    };
    const joinWaiting= ()=>{
        dispatch(roomActions.joinRoomDB( { roomNum : room_info.roomNum, id:userId, state:state}))
    }

    useEffect(()=>{
        dispatch(roomActions.getRoomListDB());
    },[]);

    return(

        <Table>
            <Thead>
                <Tr>
                    <Th>방번호</Th>
                    <TdR>
                        방이름
                    </TdR>
                    <TdP>
                        플레이어
                    </TdP>
                    <TdO>
                        관전자
                    </TdO>
                    <TdS>
                        상태
                    </TdS>
                </Tr>
                </Thead>
                <Tbody>
                {room_list.map((n,idx)=>{
                    return(
                        <Tr key={idx}>
                            <Th>{n.roomNum}</Th>
                    <TdR>
                        {n.roomName}
                    </TdR>
                    <TdP>
                        {n.playerCnt}
                    </TdP>
                    <TdO>
                       {n.observerCnt}
                    </TdO>
                    <TdS>
                        <Button
                        disabled={n.state == "wait"?false:true}
                        _onClick={()=>{
                            openModal();
                            dispatch(roomActions.getRoomInfoDB(n.roomNum));
                            }}
                        >대기실 모달창 입장{n.roomNum}</Button>
                        {n.state}
                        <LeaderBoard
                        open={modalOpen}
                        close={closeModal}
                        header="Modal heading"
                        >
                            <>
                            {room_info.roomName}
                            {room_info.roomNum}
                            <div>
                            blackPlayer
                            <div><input type="radio" id="1" name="state" value="blackPlayer" onChange={changeRadioQ1}/></div>
                            whitePlayer
                            <div><input type="radio" id="2" name="state" value="whitePlayer" onChange={changeRadioQ1}/></div>
                            blackObserver
                            <div><input type="radio" id="3" name="state" value="blackObserver" onChange={changeRadioQ1}/></div>
                            whiteObserver
                            <div><input type="radio" id="4" name="state" value="whiteObserver" onChange={changeRadioQ1}/></div>
                            </div>
                            <div>
                            
                            <Button
                            is_border="2px solid black"
                            is_width="100px"
                            is_height="50px"
                            _onClick={()=>{
                                joinWaiting();
                            }}
                            > 대기실 입장</Button>

                            </div>
                            </>
                        </LeaderBoard>
                    </TdS>
                    
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
        
    )
};
const Table = styled.table`
 width : 1000px;
 border : 2px solid #F9FFBC;
 
`;
const Thead= styled.thead`
background-color : gray;
height : 50px;
`;
const Tbody = styled.tbody`
border : 2px solid #F9FFBC;

`;
const Tr = styled.tr`
border : 1px solid #F9FFBC;
height : 50px;
`;
const Th = styled.th`
border : 1px solid #F9FFBC;
`;
const TdR = styled.td`
border : 1px solid #F9FFBC;
`;
const TdP = styled.td`
border : 1px solid #F9FFBC;
`;
const TdO = styled.td`
border : 1px solid #F9FFBC;
`;
const TdS = styled.td`
border : 1px solid #F9FFBC;
`;
export default Roomlist;