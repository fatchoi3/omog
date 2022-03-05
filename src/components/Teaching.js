import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import io from "socket.io-client";

const Teaching = (props) =>{

    const [state, setState] = useState({ message: "", name: "" });
  const [teaching, setTeaching] = useState([]);
  const testID = state.name;
  console.log(1,props.playerInfo)
  const socketRef = useRef();
  const oneChat = useRef();


  useEffect(() => {
    console.log("훈수는 언제나옴?")
    socketRef.current = io.connect("http://localhost:4001");
    socketRef.current.on("message", ({ name, message }) => {
        setTeaching([...teaching, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [teaching]);

  const renderChat = () => {
    return teaching.map(({ name, message }, index) => (
      <div
        key={index}
        className={testID == name ? "chat_from_me" : "chat_from_friend"}
      >
        {testID != name ? <div className="chat_nick">{name}</div> : null}
        <div className="chat_content">
          <div className="chat_message">{message}</div>
        </div>
      </div>
    ));
  };

    
  return(
        <Container>
        <Chat_render_oneChat ref={oneChat}>
          <h1> teaching{props.playerInfo.id}</h1>
          {renderChat()}
          {/* {viewBottom()} */}
        </Chat_render_oneChat>
        </Container>
    )
};
const Container = styled.div`
width : 300px;
`;
const Chat_render_oneChat = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 200px;
    border : 2px solid black;
`;
export default Teaching;