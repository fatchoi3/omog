import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as omockCreators } from "../redux/modules/omock";

const Div = ({ X, Y, state, setState,socket }) => {
  const dispatch = useDispatch();
  const [stone, setStone] = useState("");
  const [stoneState, setStonState] = useState(<></>);

  const socketRef = useRef();

  const Click = () => {
    if (stone) {
      console.log("돌아가");
      console.log(stone);
      return;
    }
    console.log(state.order);
    console.log("어디야0", stone);
    
    let order;
    setStone(state.order);
    if (state.order === "1") {
      order = "2";
    } else {
      order = "1";
    }
    // const {X, Y, order}= state;
    //  socket.emit('omok', { X, Y, order }) 
    setState({ X, Y, order });
    console.log("어디야", state.X, X);
    console.log("어디야2", stone);
  };
   
  useEffect(() => {
    // socketRef.current = io.connect("http://localhost:4001");
    // socketRef.current.on('omokStone', ({x,y,order}) => {
        
      if(state.X===X && state.Y===Y){
        setStonState(
          <>
          {stone === "1" ? <WhiteStone></WhiteStone> : <div></div>}
          {stone === "2" ? <BlackStone></BlackStone> : <div></div>}
              </>
        )
      
        console.log("여기야",state.X,X,stone);
        console.log(state.order);
        console.log("x :", X, "y :",Y);
      };
  
    // const {x,y,order}=state;
    // socketRef.current.emit('omokStone', {x,y,order});
    
    // return () => socketRef.current.disconnect();
  }) ;
  
  


  return (
    <DDiv onClick={Click}>
      {(state.X===X && state.Y===Y)?stoneState:stoneState}
      {/* {stone === "1" ? <WhiteStone></WhiteStone> : <div></div>}
      {stone === "2" ? <BlackStone></BlackStone> : <div></div>} */}
    </DDiv>
  );
};

const DDiv = styled.div`
  margin: 1px 0 0 1px;
  height: 34px;
  width: 34px;
  border-radius: 17px;
  -webkit-border-radius: 17px;
  display: block;
`;

const WhiteStone = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: white;
`;
const BlackStone = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: black;
`;
export default Div;
