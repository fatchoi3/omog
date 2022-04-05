import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import OmokEx1 from '../../pictures/omokex1.svg';
import OmokEx2 from '../../pictures/omokex2.svg';
import OmokEx3 from '../../pictures/omokex3.svg';
import OmokEx4 from '../../pictures/omokex4.svg';
import OmokEx5 from '../../pictures/omokex5.svg';
import OmokEx6 from '../../pictures/omokex6.svg';



function GameSlider({ handleExplainModal }) {
    const images = [OmokEx1, OmokEx2, OmokEx3, OmokEx4, OmokEx5, OmokEx6]

    // const contents = ["이것은 1번 이미지", "이것은 2번 이미지", "이것은 3번 이미지", "이것은 4번 이미지"];

    const [pickers, setPickers] = useState([]);
    const [content, setContent] = useState(["이것은 1번 이미지", "이것은 2번 이미지", "이것은 3번 이미지", "이것은 4번 이미지"]);
    const [pickIndex, setPickIndex] = useState(0);
    const [transitionPrev, setTransitionPrev] = useState(false);
    const [transitionNext, setTransitionNext] = useState(false);
    const slideRef = useRef(null);

    const handlePrevClick = useCallback(() => {
        if (pickIndex <= 0) {
            setPickIndex(images.length - 1);
            return;
        }
        setTransitionPrev(true);
        let timeout = setTimeout(setTransitionPrev(false), 700);

        setPickIndex(pickIndex - 1);
    }, [pickIndex]);

    const handleNextClick = useCallback(() => {
        if (pickIndex + 1 === images.length) {
            setPickIndex(0);
            return;
        }
        setTransitionNext(true);
        let timeout = setTimeout(setTransitionNext(false), 700);

        setPickIndex(pickIndex + 1);
    }, [pickIndex]);

    const onPickIndex = useCallback((idx) => {
        if (pickIndex === idx) {
            return;
        }

        setPickIndex(idx);
    }, [pickIndex]);


    useEffect(() => {
        setPickers(images.map((p, idx) => {
            return (
                <Picker
                    key={idx}
                    onClick={() => onPickIndex(idx)}
                    background={pickIndex === idx ? '#333333' : '#C4C4C4'}
                >
                </Picker>
            );
        }));

     
    }, [onPickIndex, pickIndex]);


    return (
        <Div>
           
            <div >
                <Container>
                    <div style={{ width: "41.01vw", height: "17.57vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <FillImage style={{ backgroundImage: `url(${images[pickIndex]})` }} ref={slideRef} />
                    </div>
                </Container>

                <PickerWrapper>
                    <div className="arrow_box" style={{ display: "flex", alignItems: "center" }}>
                        <Arrow isLeft={true} onClick={handlePrevClick}>
                            <IoIosArrowBack />
                        </Arrow>
                    </div>
                    {pickers}
                    <div className="arrow_box" style={{ display: "flex", alignItems: "center" }}>
                        <Arrow isLeft={false} onClick={handleNextClick}>
                            <IoIosArrowForward />
                        </Arrow>
                    </div>
                </PickerWrapper>
            </div>
        
        </Div>
    );
}

const Div =styled.div`
width : 48.62vw;
height : 29.29vw;
`;
const Container = styled.div`
    width: 48.62vw;
    height: 29.29vw;
    display: flex;
    overflow: hidden;
    background-color: white;
    margin : 0.59vw 1.17vw 0 4.1vw;
`;

const FillImage = styled.div`
    width: 41.01vw;
    height: 41.01vw;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const PickerWrapper = styled.div`
    display: flex;
    height: 2.93vw;
    justify-content: center;
    align-items: center;
    margin: 1.17vw auto 0.59vw auto;
`;


const Arrow = styled.div`
    margin: 0 0.88vw;
    ${(props) => props.isLeft ? 'left: 0.29vw' : 'right: 0.29vw'};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.76vw;
    cursor: pointer;
`;

const Picker = styled.div`
    width: 0.7vw;
    height: 0.7vw;
    border-radius: 50%;
    background-color: ${(props) => props.background};
    margin: 0 0.35vw;
    cursor: pointer;
`;

export default GameSlider;