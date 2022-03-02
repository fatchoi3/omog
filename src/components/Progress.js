import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Progress = (props) => {
  return (
    <ProgressBar>
      <HighLight width={((props.win) /(props.win+props.lose)) * 100 + "%"} />
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  background: #eee;
  width: 150px;
  height: 10px;
`;

const HighLight = styled.div`
  background: orange;
  transition: 1s;
  width: ${(props) => props.width};
  height: 10px;
`;

export default Progress;