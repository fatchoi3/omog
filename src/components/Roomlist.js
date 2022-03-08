import React  from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {Text ,Button} from "../elements/index"



const Roomlist = ()=>{

    const room_list = useSelector((state)=>state.room);

    console.log("room_list",room_list)

 const roomList= [
        { 
        roomNum:1,
        roomName : "너만 오면 ㄱ",
        playCnt: 2,
        observerCnt: 10,
        playState : "게임중"
        },{ 
        roomNum:1,
        roomName : "너만 오면 ㄱ",
        playCnt: 2,
        observerCnt: 10,
        playState : "게임중"
        },{ 
        roomNum:1,
        roomName : "너만 오면 ㄱ",
        playCnt: 2,
        observerCnt: 10,
        playState : "게임중"
        },{ 
        roomNum:1,
        roomName : "너만 오면 ㄱ",
        playCnt: 2,
        observerCnt: 10,
        playState : "게임중"
        },{ 
        roomNum:1,
        roomName : "너만 오면 ㄱ",
        playCnt: 2,
        observerCnt: 10,
        playState : "게임중"
        },{ 
        roomNum:1,
        roomName : "너만 오면 ㄱ",
        playCnt: 2,
        observerCnt: 10,
        playState : "게임중"
        }
 ];
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
                {roomList.map((n,idx)=>{
                    return(
                        <Tr key={idx}>
                            <Th>{n.roomNum}</Th>
                    <TdR>
                        {n.roomName}
                    </TdR>
                    <TdP>
                        {n.playCnt}
                    </TdP>
                    <TdO>
                       {n.observerCnt}
                    </TdO>
                    <TdS>
                        {n.playState}
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