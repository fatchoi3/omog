import React, { useState, useRef, useEffect ,memo,useCallback} from "react";
import styled from "styled-components";

import { Text } from "../elements";


const TeachingB = memo((props) => {

  const [teaching, setTeaching] = useState([]);
  const oneChat = useRef();
  const scroll = useRef(null);


  const socket = props.socket;

  console.log(1, props.playerInfo);
  useEffect(() => {
    console.log("아래 훈수");
    
    socket.on("teaching", (data) => {
      console.log( "data", data);
        setTeaching([...teaching, {id : data.name, message: data.chat.chat }]);
    });
    }, [teaching]);
 
  const renderChat = () => {
    return teaching.map(({ id, message }, index) => (
      <ChatContents key={index}>
        <ChatId 
        playerInfo={props.playerInfo}
        > 
          <Text
          is_size="12px"
          is_color="black"
          >
            {id}
            </Text>
          </ChatId>

        <ChatMessage
        playerInfo={props.playerInfo}
        >
          <Text
          is_size="15px"
          is_color="black "
          >
          {message}
          </Text>
          </ChatMessage>
      </ChatContents>
    ));
  };
  const bottomView = useCallback(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);
  useEffect(() => {
    bottomView();
  }, [bottomView, teaching]);

  return (
    <Container
    playerInfo={props.playerInfo}
    >
      <Profile>
      <Text

      > {props.playerInfo.id}</Text>
      </Profile>
      <Chat_render_oneChat 
      ref={oneChat} 
      playerInfo={props.playerInfo}
      >
        {renderChat()}
        <div ref={scroll}></div>
      </Chat_render_oneChat>
    </Container>
  );
});
const Container = styled.div`
  width: 400px;
  height : 160px;
  display : flex;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
  border : 3px solid  ${(props)=>props.playerInfo.state === "whitePlayer" ? `#94d7bb` : `#9E9E9E`};
  border-radius : 10px;
`;
const Chat_render_oneChat = styled.div`
  width: 280px;
  overflow-y: auto;
  margin: 10px 5px 10px 0px;
  height: 135px;
  // border: 2px solid ${(props)=>props.playerInfo.state === "whitePlayer" ? `#6071CE` : `#E296EF`};
  // background : ${(props)=>props.playerInfo.state === "whitePlayer" ? `#6071CE` : `#E296EF`}
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
  ::-webkit-scrollbar {
    display: none;
  }   
  `;
const ChatContents = styled.div`
 
`;
const ChatId = styled.div`
  margin : 5px;
  // border : 2px solid  ${(props)=>props.playerInfo.state === "whitePlayer" ? `white` : `black`};
  border-radius : 5px;
  padding : 5px;
  width: 50px;
`;
const ChatMessage = styled.div`
 margin : 5px 5px;
//  border : 2px solid  ${(props)=>props.playerInfo.state === "whitePlayer" ? `white` : `black`};
 
 padding : 5px;
 background-color: #94D7BB;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;
const Profile = styled.div`
width: 120px;
margin: 5px 0px 5px 5px;

`;
export default TeachingB;
