import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import profile1 from '../../pictures/omok-profile1.svg';
import profile2 from '../../pictures/omok-profile2.svg';
import profile3 from '../../pictures/omok-profile3.svg';
import profile4 from '../../pictures/omok-profile4.svg';
import profile5 from '../../pictures/omok-profile5.svg';
import profile6 from '../../pictures/omok-profile6.svg';
import profile7 from '../../pictures/omok-profile7.svg';
import profile8 from '../../pictures/omok-profile8.svg';
import profile9 from '../../pictures/omok-profile9.svg';
import profile10 from '../../pictures/omok-profile10.svg';
import profile11 from '../../pictures/omok-profile11.svg';


function SignupIconSlider(props) {
    const icons = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11];
    const [pickers, setPickers] = useState([]);
    const [pickIndex, setPickIndex] = useState(0);
    const [iconIndex, setIconIndex] = useState(0);
    const [iconClicked, setIconClicked] = useState(false);
    const slideRef = useRef(null);

    console.log(pickIndex)
    console.log(iconClicked)

    const handleIconClick = useCallback(() => {
        setIconIndex(pickIndex);
        setIconClicked(true);
    })

    const handlePrevClick = useCallback(() => {
        if (pickIndex <= 0) {
            setPickIndex(icons.length - 1);
            return;
        }

        setPickIndex(pickIndex - 1);
    }, [pickIndex]);

    const handleNextClick = useCallback(() => {
        if (pickIndex + 1 === icons.length) {
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
        setPickers(icons.map((p, idx) => {
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

        <div className="SliderContainer" style={{ width: "100%", height: "100px" }}>
            <Container>
                <div className="arrow_box" style={{ display: "flex", alignItems: "center" }}>
                    <Arrow isLeft={true} onClick={handlePrevClick}>
                        <IoIosArrowBack />
                    </Arrow>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    ref={slideRef}
                >

                    <FillImage
                        src={icons[pickIndex]}
                        onClick={handleIconClick}
                    />

                </div>
                <div className="arrow_box" style={{ display: "flex", alignItems: "center" }}>
                    <Arrow isLeft={false} onClick={handleNextClick}>
                        <IoIosArrowForward />
                    </Arrow>
                </div>
            </Container>
        </div >
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
    outline: ${props => props.isClicked ? "4px solid #94D7BB" : ""};

    &:hover {
        outline: 4px solid #94D7BB;
    }
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

export default SignupIconSlider;