import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Progress = (props) => {
  return (
    <ProgressBar width={props.width} margin={props.margin}>
      <HighLight width={((props.win) / (props.win + props.lose)) * 100 + "%"} />
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  background: #eee;
  width: ${(props) => (props.width ? `${props.width};` : '150px')};
  height: 10px;
  margin: ${(props) => (props.margin ? `${props.margin};` : '')};
`;

const HighLight = styled.div`
  background: #94d7bb;
  transition: 1s;
  width: ${(props) => props.width};
  height: 10px;
`;

export default Progress;