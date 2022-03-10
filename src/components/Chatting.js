import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";

import { history } from "../redux/configureStore";
import "../shared/App.css";
import { Button } from "../elements";

//const socket =  io.connect('http://localhost:4001/')

const Chatting = () => {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const [teaching, setTeaching] =useState();

  const testID = state.name;

  const socketRef = useRef();
  const oneChat = useRef();

  const id = "userId";
  
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const teachingChoice =(e)=>{
    setTeaching(e.target.value);
   
  };
  

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    if(teaching === "Text"){
      console.log("이상무")
      socketRef.current.emit("teaching", { name, message });
    }
    if(teaching === "Fly"){
      console.log("이이상상무무")
      socketRef.current.emit("flyingWord", { name, message });
    }
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
 const onClick = () =>{
   console.log()
 };
 const onKeyPress =(e)=>{
   if(e.key == "Enter"){
    onTextChange(state.message);
   }
 };




  useEffect(() => {
    console.log("채팅은 언제나옴?   ");
    socketRef.current = io.connect("http://localhost:4001");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  return (
    <ChattingContainer>
      <Button 
      is_width="400px" is_height="50px"
      _onClick={()=>{
        socketRef.current.emit("bye", { id });
        history.push("/main")
      }}
      >
        
        
        나가기
      </Button>

      <form onSubmit={onMessageSubmit}>
        <Chat_render_oneChat ref={oneChat}>
          <h1>Chatting</h1>
          {renderChat()}
        </Chat_render_oneChat>
        <>
          <select onChange={(e)=>{teachingChoice(e)}}>
            <option defaultValue="훈수하기"> 훈수하기</option>
            <option value="Text">Text</option>
            <option value="Point">Point</option>
            <option value="Fly">Fly</option>
          </select>
        </>
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
            onKeyDown={(e)=>onKeyPress(e)}
            onChange={(e) => {onTextChange(e)}}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
            width="350px"
          ></TextField>
          
          <Button
          is_height="57px"
          is_width="100px"
          >Send Message</Button>
        </div>
        
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
