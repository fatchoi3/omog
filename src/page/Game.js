import React, { useState, useRef, useEffect } from "react";
import styled ,{ keyframes }from "styled-components";

import Omog from "../components/Omog";
import Chatting from "../components/Chatting";
import Teaching from "../components/Teaching";
import PlayerCard from "../components/PlayerCard";
import FlyingWord from "../components/FlyingWord";

import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Game = () => {
  const dispatch = useDispatch();
  const get_user = useSelector((state)=>state.user.userInfo);
  const userId = localStorage.getItem("userId");

  console.log("get_user",get_user)
  const userInfo = {
    id: "jong0325",
    score: (2, 3),
    point: 1000,
    state: "playerW",
    // state: "playerB",
    // state: "observerW",
    // state: "observerB",
  };
  const playerlist = [
    {
      id: "jong0325",
      score: [2, 3],
      point: 1000,
      state: "playerW",
    },
    {
      id: "sssssseok",
      score: [3, 2],
      point: 1000,
      state: "playerB",
    },
  ];
  const socketRef = useRef();
  const [loading, setLoading]= useState(true);
  const [flying, setFlying] = useState();
  const gameNum =3;
  
  useEffect(() => {
    dispatch(userActions.loginCheckDB(userId));
    console.log("Fly훈수는 언제나옴?");
    socketRef.current = io.connect("http://15.164.103.116/game");
    // socketRef.current = io.connect("http://localhost:4001");

    socketRef.current.emit("joinGame", gameNum);
    socketRef.current.emit("nickname", userId);
    
    socketRef.current.on("flyingWord", (data) => {
        setFlying(data.chat.chat);
        setLoading(false);
        console.log( "되네")
        let timer= setTimeout(()=>{
          console.log("시간은 똑딲똑딱")
          setLoading(true);
      },1000);
    });
    return () => socketRef.current.disconnect();
  }, []);

  return (
    <GameContainer>
      {loading ?"":<FlyingWrap loading={loading}><FlyingWord flying={flying} setLoading={setLoading} type={'page'} is_dim={true}/></FlyingWrap>}
      <Wrap>
        <Omog userInfo={userInfo} />
        <UnderInfo>
          {userInfo.state == "playerW" || userInfo.state =="playerB" ? (
            <TeachingWrap>
              <Teaching playerInfo={playerlist[0]} />
              <Teaching playerInfo={playerlist[1]} />
            </TeachingWrap>
          ) : (
            <PlayerCardWrap>
              <PlayerCard playerInfo={playerlist[0]} />
              <PlayerCard playerInfo={playerlist[1]} />
            </PlayerCardWrap>
          )}
        </UnderInfo>
      </Wrap>
      <Chatting />
    </GameContainer>
  );
};
const GameContainer = styled.div`
  display: flex;
  width: 1000px;
  margin: 0 auto;
`;
const Wrap = styled.div``;
const TeachingWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PlayerCardWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UnderInfo = styled.div`
`;
const animate = keyframes`
0%
{
    transform: translateY(0);
    opacity: 0;
}
10%
{
    opacity: 1;
}
90%
{
    opacity: 1;
}
100%
{
    transform : translateY(-2000%);
    opacity: 0;
}
`;
const FlyingWrap=styled.div`
animation: ${(props)=>props.loading ? `` : `right 6.5s 4s infinite`};
`;
export default Game;
