import React,{ useState,useRef,useEffect } from "react";

import styled from 'styled-components';
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as omockCreators } from "../redux/modules/omock";

const Div = ({ x, y, order }) => {
  const dispatch = useDispatch();
  const [stone, setStone] = useState("");


  const socketRef = useRef();

  const Click = () => {
    socketRef.current.emit("omok", {  x, y, order });

    if (stone) {
      console.log("돌아가");
      console.log(stone);
      return;
    }
    dispatch(omockCreators.order(order));
    console.log("x :", x, "y :", y);
    setStone(order);
    console.log(stone);
  };

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4001");
    socketRef.current.on("omok", ({  x, y, order}) => {
      setStone(order);
    });
    return () => socketRef.current.disconnect();
  }, []);


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