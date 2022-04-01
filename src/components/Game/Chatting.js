import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import useInput from "../../hook/useInput";
import "../../shared/App.css";
import { Button, Text } from "../../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as gameActions } from "../../redux/modules/game";
import { useHistory } from "react-router-dom";

const Chatting = memo((props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, onChangeMessage, setMessage] = useInput("");
  const [disabled, setDisabled] = useState(false);
  const [teaching, setTeaching] = useState();
  const userid = localStorage.getItem("userId");
  console.log("blackPlayer",props.blackPlayer);
  console.log("whitePlayer",props.blackPlayer);
  const chatList = useSelector((state) => state.game.chat_list);
  const scroll = useRef(null);
  const socket = props.socket;
  const isTeam =
    props.userInfo.state === "blackPlayer" ||
    props.userInfo.state === "blackObserver"
      ? "black"
      : "white";
  const isPlayer = props.is_player;
  const teachingChoice = useCallback(
    (e) => {
      setTeaching(e.target.value);
      e.preventDefault();
    },
    [teaching]
  );
  const Exiting = useCallback(() => {
    if (props.userInfo.state === "blackPlayer") {
      console.log("props.whitePlayer.id",props.whitePlayer.id)
      socket.emit(
        "byebye",
        props.userInfo.state,
        props.gameNum,
        props.whitePlayer.id
      );
      console.log("블랙 플레이어 나가기")
      return;
    } else if (props.userInfo.state === "whitePlayer") {
      socket.emit(
        "byebye",
        props.userInfo.state,
        props.gameNum,
        props.blackPlayer.id
      );
      console.log("화이트 플레이어 나가기")
      return;
    }
    console.log("관전자 나가기")
    history.push("/main");
  }, []);

  const onMessageSubmit = useCallback(
    async(e) => {
      setDisabled(true);
      if (message === "") {
        console.log("빈값입니다.");
      } else {
        if (teaching === "Text" && isTeam === "white") {
          console.log("Text훈수W");
         await socket.emit("teachingW", { chat: message }, props.gameNum);
        }
        if (teaching === "Text" && isTeam === "black") {
          console.log("Text훈수B");
          await socket.emit("teachingB", { chat: message }, props.gameNum);
        }
        if (teaching === "Fly") {
          console.log("이이상상무무");
          await socket.emit("flyingWord", { chat: message }, props.gameNum);
        }
        if (teaching === "Pointer" && message === "신의한수") {
          console.log("마우스로 찍자");
          await socket.emit("Pointer", message, props.gameNum);
        }
        await socket.emit("chat", { chat: message, state: isTeam }, props.gameNum);
        console.log("채팅보내기");
        e.preventDefault();
        setMessage("");
      }
      let delay = setTimeout(() => {
        setDisabled(false);
    }, 500);
    },
    [message]
  );

  const renderChat = useCallback(() => {
    return chatList.map(({ id, message, state }, index) => (
      <>
        {id === "신의한수" ? (
          <>
            <HighLight key={index} />
          </>
        ) : (
          <div
            key={index}
            className={userid == id ? "chat_from_me" : "chat_from_friend"}
          >
            {userid == id ? <Team state={state} /> : ""}
            {userid != id ? (
              <div className="chat_nick">
                <Team state={state} />
                {id}
              </div>
            ) : null}
            <div className="chat_content">
              <div className="chat_message">{message}</div>
            </div>
          </div>
        )}
      </>
    ));
  });

  const bottomView = useCallback(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  const onKeyPress = useCallback((e) => {
    if (e.key == "Enter" && !disabled) {
      onMessageSubmit(e);
    }
    // if(e.key == "Enter"&& disabled ){
    //   let delay = setTimeout(() => {
    //     Swal.fire({
    //       title: '채팅이 너무빨라욥!',
    //       icon: 'error',
    //       confirmButtonText: 'Ok'
    //     });
    // }, 500);
     
    // }
  });

  useEffect(() => {
    dispatch(gameActions.addGameChat(socket));
    dispatch(gameActions.PointerSocket(socket));
  }, [socket]);

  useEffect(() => {
    bottomView();
  }, [bottomView, chatList]);

  return (
    <ChattingContainer>
      <ChatForm>
      <TopChat>
            <Title>
              <Text is_size="24px" is_color="#FFFFFF" is_bold>
                실시간 채팅
              </Text>
            </Title>
            <ExitButtonWrap>
              <Button
                is_width="120px"
                is_height="30px"
                is_padding="7px 0px 0px 0px"
                is_cursor
                is_background="transparent"
                is_border="#94D7BB"
                is_hover="inset -5em 0 0 0 #f0f0f0, inset 5em 0 0 0 #f0f0f0"
                _onClick={() => {
                  Exiting();
                }}
              >
                <Text is_size="24px" is_color="#FFFFFF" is_bold>
                  나가기▷
                </Text>
              </Button>
            </ExitButtonWrap>
          </TopChat>
        <Chat_render_oneChat>
          
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
            is_background="transparent"
            _onClick={onMessageSubmit}
            is_hover="inset -3.5em 0 0 0 #94D7BB, inset 3.5em 0 0 0 #94D7BB"
            disabled={disabled}
          >
            <Text>Send</Text>
          </Button>
          {isPlayer ? (
            ""
          ) : (
            <TeachingSelect
              onChange={(e) => {
                teachingChoice(e);
              }}
            >
              <Option defaultValue="채팅"> 채팅</Option>
              <Option value="Text">플레이어에게</Option>
              <Option value="Fly">날리기</Option>
              <Option value="Pointer">점찍기</Option>
            </TeachingSelect>
          )}
        </BottomWrap>
      </ChatForm>
    </ChattingContainer>
  );
});
const ChattingContainer = styled.div`
  // height: 800px;
  margin: 25px 0px 25px 20px;
  // box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
  border-radius: 16px;
  // box-sizing: border-box;
  width: 430px;
  border: 2px solid black;
`;
const ChatForm = styled.div`
  max-width: 430px;
  width: 430px;
  height: 850px;
  border-radius: 15px;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
`;
const Chat_render_oneChat = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 700px;
  max-height: 800px;
  border-radius: 15px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.div`
  margin: 12px 0 0 0;
`;
const ExitButtonWrap = styled.div``;
const TopChat = styled.div`
  width: 404px;
  height: 45px;
  line-height: 45px;
  display: flex;
  background-color: #94d7bb;
  justify-content: space-between;
  padding: 22px 13px;
  border-bottom: black 2px solid;
  border-radius : 15px 15px 0 0;
`;
const BottomWrap = styled.div`
  display: flex;
  border-top: solid 2px black;
  height: 60px;
  width: 430px;
`;
const TeachingSelect = styled.select`
  width: 100px;
  height: 52px;
  border: none;
  border-bottom-right-radius: 8px;
`;
const SendText = styled.input`
  width: 400px;
  height: 50px;
  border: none;
  background-color: #ffffff;
  padding-left: 25px;
  border-bottom-left-radius: 8px;
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
const GodSu = keyframes`
from{
  width : 0px;
}
to{
  width : 100px;
}
`;
const HighLight = styled.div`
  background: #94d7bb;

  animation-name: ${GodSu};
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: none;
  animation-play-state: running;
  height: 10px;
`;
const Team = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: 2px solid black;
  margin: 5px 0;
  background-color: ${(props) => props.state};
`;
const Option = styled.option`
width : 100px;
height : 20px;
font-size :20px;
`
export default Chatting;
