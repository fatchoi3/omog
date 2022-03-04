import React  from "react";
import styled from "styled-components";

import {Text ,Button} from "../elements/index"



const Roomlist = ()=>{
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
 border : 2px solid black;
 
`;
const Thead= styled.thead`
background-color : gray;
height : 50px;
`;
const Tbody = styled.tbody`
border : 2px solid black;

`;
const Tr = styled.tr`
border : 1px solid black;
height : 50px;
`;
const Th = styled.th`
border : 1px solid black;
`;
const TdR = styled.td`
border : 1px solid black;
`;
const TdP = styled.td`
border : 1px solid black;
`;
const TdO = styled.td`
border : 1px solid black;
`;
const TdS = styled.td`
border : 1px solid black;
`;
export default Roomlist;