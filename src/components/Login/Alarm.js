import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";
const Alarm =()=>{
    return(
        <Container>
            <Text
            is_bold
            is_margin="2.34vw 0 0 0 "
            is_color="white"
            is_size="2.34vw">
        공지 사항    
        </Text>

        <Text
        is_bold
        is_size="1.17vw"
        is_color="white"
        is_margin="1.05vw 0 0 0 "
        >오전 4: 00~ 4: 30까지 서버 점검 시간입니다.   </Text>
        <Text
        is_bold
        is_size="1.17vw"
        is_color="white"
        is_margin="1.17vw 0 0 0 "
        >
            
        이 시간에는 게임 진행이 원활하지 못 한 점 
        </Text>
        <Text
        is_bold
        is_size="1.17vw"
        is_color="white"
        is_margin="0.59vw 0 0 0 "
        >
        양해 부탁드립니다 ㅠ
        </Text>
        
        </Container>
    )
};
const Container= styled.div`
width : 23.43vw;
height: 11.72vw;
box-sizing: border-box;
border : solid 0.29vw red;
border-radius : 0.88vw;
overflow-wrap: break-word;
word-break: break-word;
background-color :#94D7BB;
`;
export default Alarm;