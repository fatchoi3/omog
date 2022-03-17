import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import useInput from "../hook/useInput";
import "../shared/App.css";
import { Button, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as gameActions } from "../redux/modules/game";

const Chatting = memo((props) => {
  const dispatch = useDispatch();
  const [message, onChangeMessage, setMessage] = useInput("");
  const [teaching, setTeaching] = useState();
  const userid = localStorage.getItem("userId");
  const chatList = useSelector((state) => state.game.chat_list);
  const scroll = useRef(null);
  const gameNum = props.gameNum;
  const socket = props.socket;

  const teachingChoice = useCallback(
    (e) => {
      setTeaching(e.target.value);
      e.preventDefault();
    },
    [teaching]
  );

  const onMessageSubmit = useCallback(
    (e) => {
      if (teaching === "Text") {
        console.log("이상무");
        socket.emit("teaching", { chat: message });
      }
      if (teaching === "Fly") {
        console.log("이이상상무무");
        socket.emit("flyingWord", { chat: message });
      }
      
      socket.emit("chat", { chat: message });
      console.log("채팅보내기");
      e.preventDefault();
      setMessage("");
    },
    [message]
  );

  const renderChat = useCallback(() => {
    return chatList.map(({ id, message }, index) => (
      <div
        key={index}
        className={userid == id ? "chat_from_me" : "chat_from_friend"}
      >
        {userid != id ? <div className="chat_nick">{id}</div> : null}
        <div className="chat_content">
          <div className="chat_message">{message}</div>
        </div>
      </div>
    ));
  });

  const bottomView = useCallback(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  const onKeyPress = useCallback((e) => {
  
    if (e.key == "Enter") {
      onMessageSubmit(e);
    }
  });

  useEffect(() => {
    dispatch(gameActions.addGameChat(socket));
    
  }, [socket]);
  useEffect(() => {
    return () => {
      // console.info("disconnect socket", icrId);
      dispatch(gameActions.clearOne());
    
    };
  }, []);

  useEffect(() => {
    bottomView();
  }, [bottomView, chatList]);

  return (
    <ChattingContainer>
      <ChatForm >
        <Chat_render_oneChat>
          <TopChat>
            <Title>
              <Text is_size="24px" is_color="#FFFFFF"  is_bold>
                실시간 채팅
              </Text>
            </Title>
            <ExitButtonWrap>
              <Button
                is_width="120px"
                is_height="30px"
                is_padding="7px 0px 0px 0px"
                is_cursor
                is_border="#94D7BB"
                _onClick={() => {
                  socket.emit("bye", { id: userid });
                  dispatch(gameActions.gameOutDB(gameNum));
                }}
              >
                <Text is_size="24px" is_color="#FFFFFF"  is_bold>
                  나가기▷
                </Text>
              </Button>
            </ExitButtonWrap>
          </TopChat>
          {renderChat()}
          <div ref={scroll}></div>
        </Chat_render_oneChat>

        <BottomWrap>
          <SendText
            name="message"
            onKeyDown={(e) => onKeyPress(e)}
            onChange={(e) => onChangeMessage(e)}
            placeholder="say something..."
            maxLength="19"
            value={message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
          <Button 
          is_height="50px" 
          is_width="150px"
          is_border="none"
          _onClick={onMessageSubmit}
          >
            <Text>Send</Text>
          </Button>
          {/* <Teaching> */}
          <TeachingSelect
            onChange={(e) => {
              teachingChoice(e);
            }}
          >
            <option defaultValue="훈수하기"> 훈수하기</option>
            <option value="Text">Text</option>
            <option value="Point">Point</option>
            <option value="Fly">Fly</option>
          </TeachingSelect>
          {/* </Teaching> */}
        </BottomWrap>
      </ChatForm>
    </ChattingContainer>
  );
});
const ChattingContainer = styled.div`
  // height: 800px;
     margin: 25px 0px 25px 20px;
  // box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
  // border-radius: 16px;
  // box-sizing: border-box;
  width: 430px;
`;
const ChatForm = styled.div`
  max-width: 430px;
  width: 430px;
  height:850px;
  border-radius: 5px;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
`;
const Chat_render_oneChat = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 795px;
  max-height: 800px;
  border-radius: 15px;
  `;
const Title = styled.div``;
const ExitButtonWrap = styled.div``;
const TopChat = styled.div`
  width: 404px;
  height: 45px;
  line-height: 45px;
  display: flex;
  background-color: #94d7bb;
  justify-content: space-between;
  padding: 22px 13px;
`;
const BottomWrap = styled.div`
  display: flex;
  border-top: solid 2px #f0f0f0;
  height: 60px;
  width: 430px;
  
`;
const Teaching = styled.div``;
const TeachingSelect = styled.select`
  width: 100px;
  height: 52px;
  border: none;
  border-bottom-right-radius:8px;
`;
const SendText = styled.input`
  width: 400px;
  height: 50px;
  border : none;
  background-color: #ffffff;
  padding-left: 25px;
  border-bottom-left-radius:8px;
  ::placeholder {
    font-size: 18px;
  }
  :focus {
    outline: none;
  }
  @media (max-width: 767px) {
    width: 300px;
    ::placeholder {
      padding: 0px 20px;
      font-size: 16px;
    }
  }
`;
export default Chatting;
