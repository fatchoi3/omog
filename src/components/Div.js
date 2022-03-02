import React,{ useState,useRef,useEffect } from "react";

import styled from 'styled-components';
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as omockCreators } from "../redux/modules/omock";

const Div = ({ x, y, order,setorder }) => {
  const dispatch = useDispatch();
  const [stone, setStone] = useState("");


  const socketRef = useRef();

  const Click = () => {
     

    if (stone) {
      console.log("돌아가");
      console.log(stone);
      return;
    }
    // socketRef.current = io.connect("http://localhost:4001");
    // socketRef.current.emit("omok", order);
    // dispatch(omockCreators.order(order));
    console.log("x :", x, "y :", y);
    setStone(order);
if(order==="1"){
  order="2"
}else{
  order="1"
}
    setorder(order);
    // socketRef.current.on("omok", order=>{
    // })
     console.log("stone", stone, order);
    //  return () => socketRef.current.disconnect();
  };

  // useEffect(() => {
  //   socketRef.current = io.connect("http://localhost:4001");
  // //   socketRef.current.on("omok", (order}) => {
  // //     if(xs=== x && ys === y){
  // //       setStone(order);
  // //     }
  // //   });
  //   return () => socketRef.current.disconnect();

  // }, [stone]);


  return (
    <DDiv onClick={Click}>
      {stone === "1" ? <WhiteStone></WhiteStone> : <div></div>}
      {stone === "2" ? <BlackStone></BlackStone> : <div></div>}
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