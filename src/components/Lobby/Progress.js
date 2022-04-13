import React from "react";
import styled from "styled-components";

const Progress = (props) => {
  return (
    <ProgressBar width={props.width} margin={props.margin}>
      <HighLight width={(props.win / (props.win + props.lose)) * 100 + "%"} />
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  background: #eee;
  width: ${(props) => (props.width ? `${props.width};` : "8.79vw")};
  height: 0.59vw;
  margin: ${(props) => (props.margin ? `${props.margin};` : "")};
`;

const HighLight = styled.div`
  background: #94d7bb;
  transition: 1s;
  width: ${(props) => props.width};
  height: 0.59vw;
`;

export default Progress;
