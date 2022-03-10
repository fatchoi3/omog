import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Text } from "../elements";
import io from "socket.io-client";
const gameNum =3;
const Teaching = (props) => {
  const [state, setState] = useState({ message: "", id: "" });
  const [teaching, setTeaching] = useState([]);
  const testID = state.id;
  console.log(1, props.playerInfo);
  const socketRef = useRef();
  const oneChat = useRef();
  const userid = localStorage.getItem("userId");

  
  useEffect(() => {
    console.log("훈수는 언제나옴?");
    // socketRef.current = io.connect("http://15.164.103.116/game");
    socketRef.current = io.connect("http://localhost:4001");
    socketRef.current.emit("joinGame", gameNum);
    socketRef.current.emit("nickname", userid);
    socketRef.current.on("teaching", (data) => {
      console.log( "data.name", data.name);
        setTeaching([...teaching, {id : data.name, message:data.chat.chat }]);

    });
     return () => socketRef.current.disconnect();
  }, [teaching]);
 
  const renderChat = () => {
    return teaching.map(({ id, message }, index) => (
      <ChatContents key={index}>
        <ChatId 
        playerInfo={props.playerInfo}
        > 
          <Text
          is_size="15px"
          is_color="#BFCAAC"
          >
            {id}
            </Text>
          </ChatId>

        <ChatMessage
        playerInfo={props.playerInfo}
        >
          <Text
          is_size="20px"
          is_color=""
          >
          {message}
          </Text>
          </ChatMessage>
      </ChatContents>
    ));
  };

  return (
    <Container>
      <h1> {props.playerInfo.id}</h1>
      <Chat_render_oneChat 
      ref={oneChat} 
      playerInfo={props.playerInfo}
      >
        {renderChat()}
        {/* {viewBottom()} */}
      </Chat_render_oneChat>
    </Container>
  );
};
const Container = styled.div`
  width: 300px;
  border : 2px solid black;
 
`;
const Chat_render_oneChat = styled.div`
  width: 100%;
  overflow-y: auto;
  border-radius : 7px;
  height: 200px;
  border: 2px solid ${(props)=>props.playerInfo.state === "playerW" ? `#6071CE` : `#E296EF`};
  background : ${(props)=>props.playerInfo.state === "playerW" ? `#6071CE` : `#E296EF`}
`;
const ChatContents = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChatId = styled.div`
  margin : 5px;
  border : 2px solid  ${(props)=>props.playerInfo.state === "playerW" ? `white` : `black`};
  border-radius : 5px;
  padding : 5px;
`;
const ChatMessage = styled.div`
 margin : 5px 5px;
 border : 2px solid  ${(props)=>props.playerInfo.state === "playerW" ? `white` : `black`};
 border-radius : 5px;
 padding : 5px;
`;
export default Teaching;
