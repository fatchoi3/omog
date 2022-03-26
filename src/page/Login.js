import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Logo from '../pictures/omokjomok.svg';
import { Text, Input, Button } from '../elements';
import LoginPageSlider from '../components/Login/LoginPageSlider';


import profile1 from '../pictures/omok-profile1.svg';
import profile2 from '../pictures/omok-profile2.svg';
import profile3 from '../pictures/omok-profile3.svg';
import profile4 from '../pictures/omok-profile4.svg';
import profile5 from '../pictures/omok-profile5.svg';
import profile6 from '../pictures/omok-profile6.svg';
import profile7 from '../pictures/omok-profile7.svg';
import profile8 from '../pictures/omok-profile8.svg';
import profile9 from '../pictures/omok-profile9.svg';
import profile10 from '../pictures/omok-profile10.svg';
import profile11 from '../pictures/omok-profile11.svg';


function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const modalEl = useRef();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [explainModal, setExplainModal] = useState(true);

    const icons = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11];
    const [pickers, setPickers] = useState([]);
    const [pickIndex, setPickIndex] = useState(0);
    const [iconIndex, setIconIndex] = useState(0);
    const slideRef = useRef(null);

    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmInput = (e) => {
        setPasswordConfirm(e.target.value);
    }

    const idCheck = (id) => {
        let _reg = /^[A-Z0-9a-z]{2,11}$/g;
        return _reg.test(id);
    }

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다!');
            return;
        }

        if (id === '' || password === '' || passwordConfirm === '') {
            alert('입력하지 않은 칸이 있습니다!');
            return;
        }

        if (idCheck(id) === false) {
            alert('아이디 형식이 올바르지 않습니다.');
            return;
        }

        dispatch(userActions.signupDB(id, password, passwordConfirm, pickIndex))
            .then(() => {
                setIsOpen(false)
            })
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (id === '' || password === '') {
            alert('입력하지 않은 칸이 있습니다!');
            return;
        }
        dispatch(userActions.loginDB(id, password)).then(
            (res) => {
                if (res === 'ok') {
                    alert('로그인 되었습니다!');
                    props.close();
                }
            }
        )
    }

    const handleSignupModal = () => {
        setIsOpen(true);
    }

    const handleClickOutside = ({ target }) => {
        if (isOpen && (!modalEl.current || !modalEl.current.contains(target))) {
            console.log(modalEl.current.contains(target))
            setIsOpen(false);
        }
    };

    const handleExplainModal = () => {
        setExplainModal(false);
    }

    const handleIconClick = useCallback(() => {
        setIconIndex(pickIndex);
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


    useEffect(() => {
        if (localStorage.getItem("token")) {
            alert("로그인 하셨습니다. 로비 페이지로 이동합니다.")
            history.push('/main')
        }
    }, [])

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);


    return (
        <>
            {explainModal &&
                <LoginPageModalContainer>
                    <LoginPageModal>
                        <div style={{ display: "flex", margin: "0 auto", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%", height: "auto" }}>
                            <LoginPageSlider />
                            <Button
                                is_width="10rem"
                                is_height="3rem"
                                is_background="#C4C4C4"
                                is_size="18px"
                                is_color="white"
                                is_weight="800"
                                is_border="none"
                                is_radius="10px"
                                is_margin="100px 0 0 0"
                                is_hover="inset -5em 0 0 0 #94D7BB, inset 5em 0 0 0 #94D7BB"
                                _onClick={handleExplainModal}
                                is_cursor="pointer"
                            >
                                SKIP
                            </Button>
                        </div>
                    </LoginPageModal>
                </LoginPageModalContainer>
            }
            {isOpen &&
                <LoginPageModalContainer signup>
                    <LoginPageModal signup ref={modalEl}>
                        <div style={{ width: "70%", margin: "0 auto 30px auto", textAlign: "center" }}>
                            <h2 style={{ color: "#189FFB", padding: "0", margin: "0", fontWeight: "800" }}>회원가입</h2>
                        </div>
                        <div style={{ display: "flex", margin: "0 auto", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%" }}>
                            <Input is_width="80%" is_max_width="20rem" is_margin="0 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="아이디 : 2자 이상 8자 미만, 영문 혹은 영문+숫자" is_outline="none" _onChange={handleIdInput} />
                            <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="비밀번호" type="password" is_outline="none" _onChange={handlePasswordInput} />
                            <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 40px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="비밀번호 확인" type="password" is_outline="none" _onChange={handlePasswordConfirmInput} />

                            <div className="SliderContainer" style={{ width: "100%", height: "auto", marginBottom: "10px" }}>
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
                            </div>

                            <Button
                                is_width="13rem"
                                is_margin="10px 0 0 0"
                                is_size="18px"
                                is_height="50px"
                                is_radius="10px"
                                is_background="#94D7BB"
                                _onClick={handleSignup}
                            >
                                회원가입
                            </Button>
                        </div>
                    </LoginPageModal>
                </LoginPageModalContainer>
            }

            <div style={{ width: "100%", textAlign: "center" }}>
                <img src={Logo} alt="로고" style={{ height: "100%", width: "25%" }} />
            </div>
            <LoginPageContainer>
                <LoginPageLoginBox>
                    <div className="input_box"
                        style={{
                            width: "70%",
                            margin: "30px auto",
                            textAlign: "center",
                            boxSizing: "border-box",
                        }}
                    >
                        <Input
                            is_border="none"
                            placeholder="아이디"
                            is_padding="3px"
                            is_margin="20px 0 15px 0"
                            is_size="17px"
                            is_outline="none"
                            is_border_bottom="2px solid black"
                            _onChange={handleIdInput}
                        />
                        <Input
                            autoComplete="on"
                            is_border="none"
                            placeholder="비밀번호"
                            is_padding="3px"
                            is_margin="15px 0 10px 0"
                            is_outline="none"
                            is_border_bottom="2px solid black"
                            type="password"
                            _onChange={handlePasswordInput}
                        />
                    </div>

                    <Button
                        is_width="75%"
                        is_height="3rem"
                        is_size="23px"
                        is_weight="600"
                        is_padding="5px"
                        is_margin="10px 0 30px 0"
                        is_cursor="pointer"
                        is_radius="10px"
                        is_background="#94D7BB"
                        _onClick={handleLogin}
                    >
                        로그인
                    </Button>

                    <div className="signup_to_box" style={{ width: "14rem", textAlign: "center", display: "flex", justifyContent: "center" }}>
                        {/* <Button is_width="60%" is_background="#94D7BB" is_radius="10px" is_cursor="pointer" is_size="13px" is_padding="14px 16px" _onClick={handleSignupModal}>
                            회원가입
                        </Button> */}
                        <Text is_color="#616161" is_cursor="pointer" _onClick={handleSignupModal}>회원가입 하러가기</Text>
                    </div>
                </LoginPageLoginBox>
            </LoginPageContainer>
        </>
    );
}


const LoginPageContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 30px;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
`

const LoginPageLoginBox = styled.div`
    display:flex;
    width: 340px;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`

const LoginPageModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${props => props.signup ? "100vh" : "auto"};
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
`

const LoginPageModal = styled.div`
    position: relative;
    display: flex;
    background: white;
    width: ${props => props.signup ? "28%" : "100%"};
    min-width: 330px;
    height: ${props => props.signup ? "561px" : "100vh"};
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    transition: 0.3s;
    flex-direction: ${props => props.signup ? "column" : ""};
    justify-content: ${props => props.signup ? "center" : ""};
    border-radius: ${props => props.signup ? "14px" : ""};
    max-width: ${props => props.signup ? "25rem" : ""};

    // 아래에서 위로
    // animation: 400ms ease-in-out 0ms 1 normal forwards running modalIn;
    // 사라락 나타나기
    animation: ${props => props.signup ? "0.3s ease us814pn" : ""};

    @keyframes us814pn {
        0%{
            // transform: translateY(600px);
            backdrop-filter: blur(0rem);
            opacity: 0;
        }  
        100%{
            // transform: translateY(0px);
            backdrop-filter: blur(0rem);
            opacity: 1;
        }
    }
`
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const FillImage = styled.img`
    max-width: 100%;
    height: 100px;
    object-fit: cover;
    outline: ${props => props.isClicked ? "4px solid #94D7BB" : ""};
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

export default Login;