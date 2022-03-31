import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";
import Progress from "./Progress";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function LeaderSlider(props) {
  const { list } = props;
console.log("list",list)
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(pickIndex, pickIndex + 3);

    return currentPosts;
  }

  const [pickers, setPickers] = React.useState([]);

  const [pickIndex, setPickIndex] = React.useState(0);
  const slideRef = React.useRef(null);

  const UserFaceColor = (point) => {
    let color = "black 0.12vw";
    if (point >= 1300 && point < 1700) {
      color = "#835506 0.23vw";
      return color;
    }
    if (point >= 1700 && point < 2500) {
      color = "#B2B2B2 0.23vw";
      return color;
    }
    if (point >= 2500 && point < 4000) {
      color = "#FFF27E 0.23vw";
      return color;
    }
    if (point >= 4000) {
      color = "#22E1E4 0.23vw";
      return color;
    }
    return color;
  };

  const handlePrevClick = React.useCallback(() => {
    if (pickIndex <= 0) {
      setPickIndex(0);
      return;
    }
    setPickIndex(pickIndex - 3);
  }, [pickIndex]);

  const handleNextClick = React.useCallback(() => {
    if (Math.ceil(pickIndex / 3) === Math.ceil(list.length / 3)) {
      setPickIndex(0);
      return;
    }
    setPickIndex(pickIndex + 3);
  }, [pickIndex]);


  return (
    <div className="SliderContainer">
      <Container>
        <div
          className="arrow_box"
          style={{ display: "flex", alignItems: "center" ,margin:"0"}}
        >
          <Arrow isLeft={true} onClick={handlePrevClick}>
            <IoIosArrowBack />
          </Arrow>
        </div>
<LeaderWrap>
        <Title>
                      <Text is_size="1.17vw" is_bold>오늘의 순위</Text>
                      </Title>
        <FillDiv ref={slideRef}>
          
          {currentPosts(list).map((p, idx) => {
            return (
              <Wrap key={idx}>
               <Text is_size="1.17vw" is_margin="1.76vw 1.76vw 1.17vw 0vw"  is_bold>{pickIndex+idx+1}</Text>
                <Stone
                  color={UserFaceColor(p.point)}
                  img={
                    p.profileImage
                      ? p.profileImage
                      : "https://haksae90.shop/images/1.svg"
                  }
                />
                <div>
                <TextWrap>
                  <Text
                    is_size="1.17vw"
                    is_color="black"
                    is_margin="1.46vw 0 0 0vw "
                  >{`${p.id}`}</Text>
                  <Text
                    is_size="0.88vw"
                    is_color="black"
                    is_margin="1.52vw 0 0 0.59vw "
                  >
                    {`${p.point}`}p
                  </Text>
                </TextWrap>
                
                  <Progress win={p.score[0].win} lose={p.score[1].lose}/>
                  <Text is_size="10px"> 승 : {p.score[0].win} 패 : {p.score[1].lose}</Text>
                </div>
             </Wrap>
            );
          })}
        </FillDiv>
        </LeaderWrap>
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
  width: 32.81vw;
  height: 22.26vw;
  display: flex;
  margin: 0 auto;
`;

const FillDiv = styled.div`
  width: 25.78vw;
  height: 14.65vw;
  margin: 1.17vw 0 ;
  object-fit: cover;
  padding: 0.59vw 0 0 0.29vw;
  box-shadow: -0.18vw 0.41vw 0.35vw 0.06vw #999;
  border : 0.12vw black solid;
  border-radius : 0.88vw;
`;

const PickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.17vw auto;
`;

const Arrow = styled.div`
  margin: 0 0.88vw;
  ${(props) => (props.isLeft ? "left: 0.29vw" : "right: 0.29vw")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.76vw;
  cursor: pointer;
`;
const Stone = styled.div`
  width: 2.93vw;
  height: 2.93vw;
  border-radius: 2.93vw;
  border: solid ${(props) => props.color};
  margin: 0.59vw 0 0 0.59vw;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
`;
const TextWrap = styled.div`
  margin: 0.29vw 0 0.29vw 1.76vw;
  display: flex;
  width: 8.79vw;
`;
const Wrap = styled.div`
  display: flex;
  width: 17.57vw;
  height: 4.69vw;
  margin: 0 auto;
  
`;
const Title = styled.div`

`;
const LeaderWrap =styled.div`
margin : 1.17vw auto;
width : 29.29vw;
`;
export default LeaderSlider;
