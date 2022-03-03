import React ,{ useState,useRef, useEffect  }from "react";

import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import Div from "./Div";


const OmockBase = () => {
  // const order = useSelector((state) => state.omock.order);
  // const [orders, setOrders] = useState("1");
  const [gamestate, setState]= useState({x:"", y:"",order:"1"});
  const socketRef = useRef();
  console.log("순서",gamestate.order);
let i;
  useEffect(() => {
    
    console.log("gamestate",gamestate)
    socketRef.current = io.connect("http://localhost:4001");
    socketRef.current.on('omok', ({x,y,order}) => {
        
        setState({x,y,order})
       
    });
    const {x,y,order}=gamestate;
    socketRef.current.emit('omok', {x,y,order});
    
    return () => socketRef.current.disconnect();
   

  }, [gamestate.order]);
  console.log(gamestate)

  return (
    <>
      <Table>
        <tbody>
          {[...Array(19)].map((n, i) => {
            return (
              <Tr key={i}>
                {[...Array(19)].map((n, index) => {
                  return (
                    <Td key={index}>
                      <Div 
                      X={index} 
                      Y={i} 
                      // order={orders}
                      // setorder={setOrders}
                      state={gamestate} 
                      setState={setState}
                      socket={socketRef.current}
                      />
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
    const Tr = styled.tr`
    border: solid 2px black;
    `;
    const Table = styled.table`
    text-indent: initial;
    border-spacing: 2px;
    background-color: #BA743B;
    border-collapse: collapse;
    margin: 0 auto;
    `;
    const Td= styled.td`
    width: 36px;
    height: 36px;
    border: 1px solid black;
    text-align: center;
    color: #666;
    cursor: pointer;
    `;
  
export default OmockBase;