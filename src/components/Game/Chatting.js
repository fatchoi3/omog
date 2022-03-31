import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import styled, { keyframes } from "styled-components";
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
    (e) => {
      if (message === "") {
        console.log("빈값입니다.");
      } else {
        if (teaching === "Text" && isTeam === "white") {
          console.log("Text훈수W");
          socket.emit("teachingW", { chat: message }, props.gameNum);
        }
        if (teaching === "Text" && isTeam === "black") {
          console.log("Text훈수B");
          socket.emit("teachingB", { chat: message }, props.gameNum);
        }
        if (teaching === "Fly") {
          console.log("이이상상무무");
          socket.emit("flyingWord", { chat: message }, props.gameNum);
        }
        if (teaching === "Pointer" && message === "신의한수") {
          console.log("마우스로 찍자");
          socket.emit("Pointer", message, props.gameNum);
        }
        socket.emit("chat", { chat: message, state: isTeam }, props.gameNum);
        console.log("채팅보내기");
        e.preventDefault();
        setMessage("");
      }
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
    if (e.key == "Enter") {
      onMessageSubmit(e);
    }
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
        <Chat_render_oneChat>
          <TopChat>
            <Title>
              <Text is_size="1.41vw" is_color="#FFFFFF" is_bold>
                실시간 채팅
              </Text>
            </Title>
            <ExitButtonWrap>
              <Button
                is_width="7.03vw"
                is_height="1.76vw"
                is_padding="0.41vw 0vw 0vw 0vw"
                is_cursor
                is_background="transparent"
                is_border="#94D7BB"
                is_hover="inset -5em 0 0 0 #f0f0f0, inset 5em 0 0 0 #f0f0f0"
                _onClick={() => {
                  Exiting();
                }}
              >
                <Text is_size="1.41vw" is_color="#FFFFFF" is_bold>
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
            is_height="2.93vw"
            is_width="8.79vw"
            is_border="none"
            is_background="transparent"
            _onClick={onMessageSubmit}
            is_hover="inset -3.5em 0 0 0 #94D7BB, inset 3.5em 0 0 0 #94D7BB"
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
              <option defaultValue="채팅"> 채팅</option>
              <option value="Text">플레이어에게</option>
              <option value="Fly">날리기</option>
              <option value="Pointer">점찍기</option>
            </TeachingSelect>
          )}
        </BottomWrap>
      </ChatForm>
    </ChattingContainer>
  );
});
const ChattingContainer = styled.div`
  // height: 46.87vw;
  margin: 1.46vw 0vw 1.46vw 1.17vw;
  // box-shadow: 0vw 0.23vw 2.05vw 0.23vw rgba(162, 162, 162, 0.25);
  border-radius: 0.94vw;
  // box-sizing: border-box;
  width: 25.19vw;
  border: 0.12vw solid black;
`;
const ChatForm = styled.div`
  max-width: 25.19vw;
  width: 25.19vw;
  height: 49.79vw;
  border-radius: 0.88vw;
  box-shadow: 0vw 0.18vw 1.41vw -0.47vw rgba(0, 0, 0, 0.75);
`;
const Chat_render_oneChat = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 46.57vw;
  max-height: 46.87vw;
  border-radius: 0.88vw;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.div`
  margin: 0.7vw 0 0 0;
`;
const ExitButtonWrap = styled.div``;
const TopChat = styled.div`
  width: 23.67vw;
  height: 2.64vw;
  line-height: 2.64vw;
  display: flex;
  background-color: #94d7bb;
  justify-content: space-between;
  padding: 1.29vw 0.76vw;
  border-bottom: black 0.12vw solid;
`;
const BottomWrap = styled.div`
  display: flex;
  border-top: solid 0.12vw black;
  height: 3.51vw;
  width: 25.19vw;
`;
const TeachingSelect = styled.select`
  width: 5.86vw;
  height: 3.05vw;
  border: none;
  border-bottom-right-radius: 0.47vw;
`;
const SendText = styled.input`
  width: 23.43vw;
  height: 2.93vw;
  border: none;
  background-color: #ffffff;
  padding-left: 1.46vw;
  border-bottom-left-radius: 0.47vw;
  ::placeholder {
    font-size: 1.05vw;
  }
  :focus {
    outline: none;
  }
  @media (max-width: 44.93vw) {
    width: 17.57vw;
    ::placeholder {
      padding: 0vw 1.17vw;
      font-size: 0.94vw;
    }
  }
`;
const GodSu = keyframes`
from{
  width : 0vw;
}
to{
  width : 5.86vw;
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
  height: 0.59vw;
`;
const Team = styled.div`
  width: 0.59vw;
  height: 0.59vw;
  border-radius: 0.59vw;
  border: 0.12vw solid black;
  margin: 0.29vw 0;
  background-color: ${(props) => props.state};
`;
export default Chatting;
