import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import OmokEx1 from '../../pictures/omokex1.svg';
import OmokEx2 from '../../pictures/omokex2.svg';
import OmokEx3 from '../../pictures/omokex3.svg';
import OmokEx4 from '../../pictures/omokex4.svg';
import OmokEx5 from '../../pictures/omokex5.svg';
import OmokEx6 from '../../pictures/omokex6.svg';


function LoginPageSlider({ handleExplainModal }) {
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
        <>
            <div className="SliderContainer">
                <Container>
                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            <ExplainModalOut onClick={handleExplainModal}>
                SKIP
            </ExplainModalOut>
        </>
    );
}


const Container = styled.div`
    width: 45rem;
    height: 45rem;
    display: flex;
    overflow: hidden;
    background-color: white;

@media only screen and (max-width: 600px) {
    width: 70vmax;
    height: 70vmax;
}

@media only screen and (min-width: 600px) {
    width: 75vmin;
    height: 75vmin;
}

@media only screen and (min-width: 992px) {
    width: 80vmin;
    height: 80vmin;
}

@media only screen and (min-width: 1280px) {
    width: 80vmin;
    height: 80vmin;
}
`;

const FillImage = styled.div`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const PickerWrapper = styled.div`
    display: flex;
    height: 50px;
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

const ExplainModalOut = styled.button`
    position: relative;
    width: 10rem;
    height: 3rem;
    line-height: 1.8;
    right: -340px;
    bottom: -20px;
    background: #94D7BB;
    font-size: 18px;
    font-weight: 800;
    color: #195e20;
    text-align: center;
    border: 2px solid #000000;
    border-radius: 10px;
    transition: all 0s linear 0s;
    cursor: pointer;

    &:before {
        content: "Go";
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0px;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 30px;
        transform: scale(0,1);
        transition: all 0s linear 0s;
    }

    &:hover {
        text-indent: -9999px;

        &:before {
            transform: scale(1,1);
            text-indent: 0;
        }
    }


@media only screen and (max-width: 600px) {
    bottom: -10px;
    right: 0px;
}

@media only screen and (min-width: 600px) {
    bottom: -10px;
    right: 0px;
}

@media only screen and (min-width: 992px) {
    bottom: 60px;
    right: -340px;
    line-height: 2.5;
}
`;

export default LoginPageSlider;