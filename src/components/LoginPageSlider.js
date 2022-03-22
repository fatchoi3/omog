import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import OmokEx1 from '../pictures/omok_explain1.png'
import OmokEx2 from '../pictures/omok_explain2.png'
import OmokEx3 from '../pictures/omok_explain3.png'
import OmokEx4 from '../pictures/omok_explain4.png'
import OmokEx5 from '../pictures/omok_explain5.png'



function LoginPageSlider(props) {
    const images = [OmokEx1, OmokEx2, OmokEx3, OmokEx4, OmokEx5]

    // const contents = ["이것은 1번 이미지", "이것은 2번 이미지", "이것은 3번 이미지", "이것은 4번 이미지"];

    const [pickers, setPickers] = useState([]);
    const [content, setContent] = useState(["이것은 1번 이미지", "이것은 2번 이미지", "이것은 3번 이미지", "이것은 4번 이미지"]);
    const [pickIndex, setPickIndex] = useState(0);
    const slideRef = useRef(null);

    const handlePrevClick = useCallback(() => {
        if (pickIndex <= 0) {
            setPickIndex(images.length - 1);
            return;
        }

        setPickIndex(pickIndex - 1);
    }, [pickIndex]);

    const handleNextClick = useCallback(() => {
        if (pickIndex + 1 === images.length) {
            setPickIndex(0);
            return;
        }

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

        // slideRef.current.style.transition = 'all 0.5s ease-in-out';
        // slideRef.current.style.transform = `translateX(-${pickIndex}00%)`;
    }, [onPickIndex, pickIndex]);


    return (
        <div className="SliderContainer">
            <Container>
                <div className="arrow_box" style={{ display: "flex", alignItems: "center" }}>
                    <Arrow isLeft={true} onClick={handlePrevClick}>
                        <IoIosArrowBack />
                    </Arrow>
                </div>
                <div style={{ width: "40rem", height: "30rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <FillImage src={images[pickIndex]} ref={slideRef} />
                </div>
                <div className="arrow_box" style={{ display: "flex", alignItems: "center" }}>
                    <Arrow isLeft={false} onClick={handleNextClick}>
                        <IoIosArrowForward />
                    </Arrow>
                </div>
            </Container>

            <PickerWrapper>
                {pickers}
            </PickerWrapper>

            {/* <Text is_center="center">
                {contents[pickIndex]}
            </Text> */}
        </div>
    );
}


const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const FillImage = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: cover;
    box-shadow: 3px 3px 3px #999;
`;

const PickerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 10px auto;
`;

const Arrow = styled.div`
    margin: 0 15px;
    ${(props) => props.isLeft ? 'left: 5px' : 'right: 5px'};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
`;

const Picker = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.background};
    margin: 0 6px;
    cursor: pointer;
`;

export default LoginPageSlider;