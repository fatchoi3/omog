import React ,{ useState,useRef, useEffect  }from "react";

import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import Div from "./Div";


const OmockBase = () => {
  // const order = useSelector((state) => state.omock.order);
  const [orders, setOrders] = useState("1");
  const socketRef = useRef();
  console.log("순서",orders);
let i;
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4001");
    socketRef.current.on('omok', order => {
        setOrders(order);
        i=order
    });
    console.log(i)
    socketRef.current.emit('omok', orders);
    return () => socketRef.current.disconnect();
    
  }, [orders]);


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
                      x={index} 
                      y={i} 
                      order={orders}
                      setorder={setOrders} />
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