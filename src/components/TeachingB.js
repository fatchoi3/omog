import React, { useState, useRef, useEffect ,memo,useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Text } from "../elements";
import { actionCreators as gameActions } from "../redux/modules/game";


const TeachingB = memo((props) => {
  
  const dispatch = useDispatch();
  const [teaching, setTeaching] = useState([]);
  const chatList = useSelector((state) => state.game.Teaching_listB);
  const scroll = useRef(null);


  const socket = props.socket;

  console.log("chatList",chatList);
  
  const renderChat = () => {
    return (
    <div ref={scroll}>
      {chatList.map(({ id, message }, index) => (
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
      )
       )}
  </div>
      )
      };
  const bottomView = useCallback(() => {
    scroll.current?.scrollIntoView({  block: "end" });
  }, []);

  useEffect(() => {
    bottomView();
  }, [bottomView, chatList]);

  useEffect(() => {
    dispatch(gameActions.AddTeachB(socket))
    }, [socket]);
 

  return (
    <Container
    playerInfo={props.playerInfo}
    >
      <Profile>
      <Text

      > {props.playerInfo?props.playerInfo.id:"1"}</Text>
      </Profile>
      <Chat_render_oneChat  
      playerInfo={props.playerInfo}
      >
        {renderChat()}
        
      </Chat_render_oneChat>
    </Container>
  );
});
const Container = styled.div`
  width: 400px;
  height : 160px;
  display : flex;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
  border : 3px solid  ${(props)=>props.playerInfo?.state === "whitePlayer" ? `#94d7bb` : `#9E9E9E`};
  border-radius : 10px;
`;
const Chat_render_oneChat = styled.div`
  width: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 10px 5px 10px 0px;
  height: 135px;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
  ::-webkit-scrollbar {
    display: none;
  }   
  `;
const ChatContents = styled.div`
 
`;
const ChatId = styled.div`
  margin : 5px;
  border-radius : 5px;
  padding : 5px;
  width: 50px;
`;
const ChatMessage = styled.div`
 margin : 5px 5px;
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
