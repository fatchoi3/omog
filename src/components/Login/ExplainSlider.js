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

        // slideRef.current.style.transition = 'all 0.5s ease-in-out';
        // slideRef.current.style.transform = `translateX(-${pickIndex}00%)`;
    }, [onPickIndex, pickIndex]);


    return (
        <>
            {/* <img src={Logo} alt="로고" style={{ width: "162px", height: "92px" }} /> */}
            <div className="SliderContainer">
                <Container>
                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <FillImage style={{ backgroundImage: `url(${images[pickIndex]})` }} ref={slideRef} />
                    </div>
                </Container>

                <PickerWrapper>
                    {/* <div className={`pagination-wrapper${transitionPrev ? " transition-prev" : (transitionNext ? " transition-next" : "")}`}>
                    <svg className="btn btn--prev" height="96" viewBox="0 0 24 24" width="96" xmlns="http://www.w3.org/2000/svg"
                        onClick={handlePrevClick}>
                        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
                        <path d="M0-.5h24v24H0z" fill="none" />
                    </svg>

                    <div className="pagination-container">
                        <div className="little-dot  little-dot--first"></div>
                        <div className="little-dot">
                            <div className="big-dot-container">
                                <div className="big-dot"></div>
                            </div>
                        </div>
                        <div className="little-dot  little-dot--last"></div>
                    </div>

                    <svg className="btn btn--next" height="96" viewBox="0 0 24 24" width="96" xmlns="http://www.w3.org/2000/svg"
                        onClick={handleNextClick}>
                        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                        <path d="M0-.25h24v24H0z" fill="none" />
                    </svg>
                </div> */}
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
    /* background: blue; */

    /* >div {
        position: relative;
        display: flex;

        @keyframes pagination-container--animation-prev {
            0% { transform: translateX(0); }
            100% { transform: translateX(18px); }
            }

        @keyframes pagination-container--animation-next {
            0% { transform: translateX(0); }
            100% { transform: translateX(-18px); }
        }

        .transition-prev .pagination-container {
            animation: pagination-container--animation-prev 0.3s forwards;
        }

        .transition-next .pagination-container {
            animation: pagination-container--animation-next 0.3s forwards;
        }

        .pagination-container {
            display: flex;
            align-items: center;
        }

        .little-dot {
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 100%;
            display: inline-block;
            margin: 0 6px;
            position: relative;
            z-index: 10;
        }

        .little-dot--first,
        .little-dot--last {
            z-index: 5;
        }

        @keyframes slideLeft {
            0% {
                transform: translateX(0px);
            }

            100% {
                transform: translateX(-18px);
            }
        }

        .transition-prev .little-dot--first {
            animation: slideLeft 0.4s 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        @keyframes little-dot--first--animation {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }

        .transition-next .little-dot--first {
            animation: little-dot--last--animation 0.3s forwards;
        }

        @keyframes little-dot--last--animation {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }

        .transition-prev .little-dot--last {
            animation: little-dot--last--animation 0.3s forwards;
        }

        @keyframes slideRight {
            0% {
                transform: translateX(0px);
                opacity: 1;
            }

            100% {
                transform: translateX(18px);
                opacity: 1;
            }
        }

        .transition-next .little-dot--last {
            animation: slideRight 0.4s 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .big-dot {
            width: 12px;
            height: 12px;
            border-radius: 100%;
            background: #f6af54;
            position: absolute;
            top: 50%;
            right: -6px;
            transform: translateY(-50%);
        }

        .transition-next .big-dot {
            right: auto;
            left: -6px;
        }

        .big-dot-container {
            width: 18px;
            height: 18px;
            border-radius: 100%;
            position: absolute;
            top: 50%;
            right: 3px;
            transform: translateY(-50%);
            z-index: 10;
        }

        .transition-next .big-dot-container {
            right: auto;
            left: 3px;
        }

        @keyframes big-dot-container--animation-prev {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(-50%) rotate(-179deg); }
        }

        @keyframes big-dot-container--animation-next {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(-50%) rotate(-181deg); }
        }

        .transition-prev .big-dot-container {
            animation: big-dot-container--animation-prev 0.3s forwards;
        }

        .transition-next .big-dot-container {
            animation: big-dot-container--animation-next 0.3s forwards;
        }

        .btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            fill: #000;
            cursor: pointer;
            transition: opacity 0.2s;
        }

        .btn:hover {
            opacity: 0.5;
        }

        .btn--next {
            left: calc(100% + 20px);  
        }

        .btn--prev {
            right: calc(100% + 20px);
        }
    } */
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
    color: white;
    text-align: center;
    border: 2px solid #000000;
    border-radius: 10px;
    transition: all 0.2s linear 0s;
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
        transition: all 0.2s linear 0s;
    }

    &:hover {
        text-indent: -9999px;

        &:before {
            transform: scale(1,1);
            text-indent: 0;
        }
    }


/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    bottom: -10px;
    right: 0px;
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    bottom: -10px;
    right: 0px;
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    bottom: 60px;
    right: -340px;
    line-height: 2.5;
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  /* ... */
}
`;

export default LoginPageSlider;