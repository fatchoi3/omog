import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { Text } from "../elements";
import io from "socket.io-client";

const FlyingWord = (props) => {
    const { type, is_dim } = props;

  console.log("FlyingWord", props);


  return (
    <Container  type={type} is_dim={is_dim}>
        
        {props.flying}
        
      </Container>
  );
};

const Container = styled.div`
width: 100px;
display: flex;
align-items: center;
justify-content: center;
padding: 20px 0;
transition: width 1s linear
${(props) =>
  props.type === "page"
    ? `position: fixed;
      height: 50vh;
      top: 0;
      left: 0;
      padding: 0;
      zIndex: 9999;`
    : ``}
${(props) =>
  props.is_dim
    ? `
   background: rgba(0,0,0,0.4); 
   height: 50vh;
`
    : ``}

`;

export default FlyingWord;
