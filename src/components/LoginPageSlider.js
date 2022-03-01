import React from 'react';
import styled from 'styled-components';
import Text from '../elements/Text';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function LoginPageSlider(props) {
    const images = ["https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2",
        "http://newsimg.hankookilbo.com/2017/11/06/201711060912547465_2.jpg",
        "https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335",
        "http://image.kmib.co.kr/online_image/2019/1015/611718110013817661_1.jpg"
    ]

    const contents = ["이것은 1번 이미지", "이것은 2번 이미지", "이것은 3번 이미지", "이것은 4번 이미지"];

    const [pickers, setPickers] = React.useState([]);
    const [content, setContent] = React.useState(["이것은 1번 이미지", "이것은 2번 이미지", "이것은 3번 이미지", "이것은 4번 이미지"]);
    const [pickIndex, setPickIndex] = React.useState(0);
    const slideRef = React.useRef(null);

    const handlePrevClick = React.useCallback(() => {
        if (pickIndex <= 0) {
            setPickIndex(images.length - 1);
            return;
        }

        setPickIndex(pickIndex - 1);
    }, [pickIndex]);

    const handleNextClick = React.useCallback(() => {
        if (pickIndex + 1 === images.length) {
            setPickIndex(0);
            return;
        }

        setPickIndex(pickIndex + 1);
    }, [pickIndex]);

    const onPickIndex = React.useCallback((idx) => {
        if (pickIndex === idx) {
            return;
        }

        setPickIndex(idx);
    }, [pickIndex]);


    React.useEffect(() => {
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

                <FillImage src={images[pickIndex]} ref={slideRef} />

                <div className="arrow_box" style={{ display: "flex", alignItems: "center" }}>
                    <Arrow isLeft={false} onClick={handleNextClick}>
                        <IoIosArrowForward />
                    </Arrow>
                </div>
            </Container>

            <PickerWrapper>
                {pickers}
            </PickerWrapper>

            <Text is_center="center">
                {contents[pickIndex]}
            </Text>
        </div>
    );
}


const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const FillImage = styled.img`
    width: 384px;
    height: 384px;
    object-fit: cover;
`;

const PickerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
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