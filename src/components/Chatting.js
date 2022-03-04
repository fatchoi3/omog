import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";

import "../shared/App.css";
import { Button } from "../elements";

//const socket =  io.connect('http://localhost:4001/')

const Chatting = () => {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const testID = state.name;

  const socketRef = useRef();
  const oneChat = useRef();
  const renderOneChat = oneChat.current;
  
  useEffect(() => {
    console.log("채팅은 언제나옴?   ")
    socketRef.current = io.connect("http://localhost:4001");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);



  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
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
  const viewBottom = () => {
    renderOneChat?.lastChild?.lastChild.scrollIntoView();
  };
  return (
    <ChattingContainer>

      <Button
      is_width ="400px"
      is_height = "50px"
      > 나가기</Button>

      <form onSubmit={onMessageSubmit}>
        <Chat_render_oneChat ref={oneChat}>
          <h1>Chatting</h1>
          {renderChat()}
          {/* {viewBottom()} */}
        </Chat_render_oneChat>

        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
            width="350px"
          />
        </div>
        <button>Send Message</button>
      </form>
    </ChattingContainer>
  );
};
const ChattingContainer = styled.div`
 
  height: 800px;
  margin: 0 20px;
  box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
  border-radius: 16px;
  box-sizing: border-box;
  width: 500px;
  .group_chat_container {
    padding: 18px;
  //  height: calc(100% - 150px);
  }
  // .chat_textfield_container {
  //   position: absolute;
  //   bottom: 20px;
  //   width: 92%;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }
  
`;
// const RenderChat = styled.div`
//   max-width: 350px;
//   height: 700px;
//   border-radius: 5px;
//   padding: 20px;
//   box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
//   overflowy: "scroll";
// `;
const Chat_render_oneChat = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 600px;
`;
export default Chatting;
