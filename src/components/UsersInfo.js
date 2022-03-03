import React from "react";
import styled from 'styled-components';

import {Text} from "../elements/index"

import Progress from "./Progress";

const UsersInfo =()=>{
    const win = 6;
    const lose = 4;
const userList = [
    {
    user_url : "사진",
    user_name : "닉네임123"
},
{
    user_url : "사진",
    user_name : "닉네임123"
},
{
    user_url : "사진",
    user_name : "닉네임123"
},
{
    user_url : "사진",
    user_name : "닉네임123"
},
{
    user_url : "사진",
    user_name : "닉네임123"
},
{
    user_url : "사진",
    user_name : "닉네임123"
}
];

    return(
        <UserInfoContainer>
        <User>
            닉네임123
            <Progress 
            win={win}
            lose={lose}
            />
            <UserScore>
            <p>승률 {win/(win+lose)*100 +"%"}</p>
            <p>(전체 {win}승 {lose}패)</p>
            </UserScore>
            <Text> Point 1000P</Text>
            </User>
            <UserS>
            <p>현재 접속 유저</p>
            <UserContents>
                {userList.map((p,idx)=>{
                    return(
                    <UserContent 
                    key={idx}>
                    <Userurl/>
                      <Text
                      is_size="15px"
                      is_color="black"
                      >{`${p.user_name}`}</Text>
                    </UserContent>
                    )
                })}
            </UserContents>
            </UserS>
            <Ranking>
                <RankingTitle>
                <Text>오늘의 랭킹</Text>  <Text>더보기+</Text>
                </RankingTitle>
                <UserContents>
                {userList.map((p,idx)=>{
                    return(
                    <UserContent
                    key={idx}>
                    <Userurl/>
                      <Text
                      is_size="15px"
                      is_color="black"
                      >{`${p.user_name}`}</Text>
                    </UserContent>
                    )
                })}
            </UserContents>
            </Ranking>
            </UserInfoContainer>
    )
};
const UserInfoContainer = styled.div`
height: 800px;
margin: 30px 10px;
`;
const User = styled.div`
height: 30%;
`;
const UserS = styled.div`
height: 30%;
`;
const Ranking =styled.div`
height: 30%;
`;
const UserContents = styled.div`
height: 30px;
`;
const UserContent = styled.div`
height: 30px;
display: flex;

`;
const Userurl = styled.div`
height: 30px;
width: 30px;
border-radius: 30px;
background-color: gray;
`;
const RankingTitle = styled.div`
display: flex;
`;
const UserScore = styled.div`
display: flex;
`;
export default UsersInfo;