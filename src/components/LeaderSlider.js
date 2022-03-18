import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function LeaderSlider(props) {
  const { list } = props;

  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(pickIndex, pickIndex+3 );
    
    return currentPosts;
  }
  

  const [pickers, setPickers] = React.useState([]);
  
  const [pickIndex, setPickIndex] = React.useState(0);
  const slideRef = React.useRef(null);


  const handlePrevClick = React.useCallback(() => {
    if (pickIndex <= 0) {
      setPickIndex(0);
      return;
    }
    setPickIndex(pickIndex - 3);
  }, [pickIndex]);

  const handleNextClick = React.useCallback(() => {
    if (Math.ceil(pickIndex/3) === (Math.ceil(list.length/3))) {
      setPickIndex(0);
      return;
    }
    setPickIndex(pickIndex + 3  );
  }, [pickIndex]);

  const onPickIndex = React.useCallback(
    (idx) => {
      if (pickIndex === idx+3) {
        return;
      }

      setPickIndex(idx+3);
    },
    [pickIndex]
  );
 
  return (
    <div className="SliderContainer">
      <Container>
        <div
          className="arrow_box"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Arrow isLeft={true} onClick={handlePrevClick}>
            <IoIosArrowBack />
          </Arrow>
        </div>

        <FillDiv  ref={slideRef} >{currentPosts(list).map((p, idx) => {
              return (


                    <Wrap key={idx}>
                        <Stone/>
                        <TextWrap>
                  <Text is_size="20px" is_color="black" is_margin= "7px 0 0 0px ">{`${p.id}`}</Text>
                  <Text is_size="15px" is_color="black" is_margin= "9px 0 0 10px ">{`${p.point}`}p</Text>
                  </TextWrap>
                  </Wrap>
              );
            })}
</FillDiv>
        <div
          className="arrow_box"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Arrow isLeft={false} onClick={handleNextClick}>
            <IoIosArrowForward />
          </Arrow>
        </div>
      </Container>

      <PickerWrapper>{pickers}</PickerWrapper>
    </div>
  );
}

const Container = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  margin : 0 auto;
`;

const FillDiv = styled.div`
  width: 384px;
  height: 200px;
  margin : 20px 0 0 0;
  object-fit: cover;
  padding : 10px 0 0 5px;
  box-shadow: 2px 2px 2px 3px #999;
`;

const PickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
`;

const Arrow = styled.div`
  margin: 0 15px;
  ${(props) => (props.isLeft ? "left: 5px" : "right: 5px")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
`;
const Stone = styled.div`
width : 40px;
height : 40px;
border-radius : 40px;
border : solid 2px black;
`;
const TextWrap =styled.div`
 margin : 5px 0 5px 30px;
 display : flex;
 width : 200px;
 border-bottom : 5px solid #94d7bb;
`;
const Wrap = styled.div`
display : flex;
width : 300px;
height : 60px;
`;
export default LeaderSlider;