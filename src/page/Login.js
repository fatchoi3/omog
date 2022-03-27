import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

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
import SignupModal from '../components/Login/SignupModal';


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


    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
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
                <SignupModal handleSignupModal={handleSignupModal} ref={modalEl} />
            }

            <LogoBox>
                <img src={Logo} alt="로고" />
            </LogoBox>
            <LoginPageContainer>
                <div className="login_box">
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
                        <Text is_color="#616161" is_cursor="pointer" _onClick={handleSignupModal}>회원가입 하러가기</Text>
                    </div>
                </div>
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

    > div {
        display:flex;
        width: 25rem;
        height: auto;
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    @media only screen and (min-width: 1200px) {
        >div {
            width: 30rem;
        }
    }
`

const LogoBox = styled.div`
    width: 100%;
    text-align: center;

    >img {
        height: auto;
        width: 20rem
    }


    @media only screen and (min-width: 1200px) {
        >img {
            width: 23rem;
        }
    }


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
    z-index: 5;
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


const Picker = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.background};
    margin: 0 6px;
    cursor: pointer;
`;

export default Login;