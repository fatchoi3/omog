import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Logo from '../pictures/omokjomok.svg'
import Button from '../elements/Button';
import Text from '../elements/Text';
import Input from '../elements/Input';
import LoginPageSlider from '../components/LoginPageSlider';


function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const modalEl = useRef();

    const [id, setId] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [explainModal, setExplainModal] = useState(true);


    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmInput = (e) => {
        setPasswordConfirm(e.target.value);
    }

    const handleNicknameInput = (e) => {
        setNickname(e.target.value);
    }

    const emailCheck = (id) => {
        let _reg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+){2,3}$/;
        return _reg.test(id);
    }

    const pwdCheck = (password) => {
        // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
        let _reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        return _reg.test(password);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        // if (!emailCheck(id)) {
        //     alert('이메일이 형식에 맞지 않습니다!');
        //     return;
        // }

        // if (!pwdCheck(password)) {
        //     alert('비밀번호가 형식에 맞지 않습니다!');
        //     return;
        // }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다!');
            return;
        }

        if (id === '' || password === '' || nickname === '' || passwordConfirm === '') {
            alert('입력하지 않은 칸이 있습니다!');
            return;
        }

        dispatch(userActions.signupDB(id, nickname, password, passwordConfirm)).then(
            (res) => {
                setIsOpen(false);
            }
        )
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
                <GameExplainContainer>
                    <GameExplainModal>
                        <div style={{ display: "flex", margin: "0 auto", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%" }}>
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
                            >
                                SKIP
                            </Button>
                        </div>
                    </GameExplainModal>
                </GameExplainContainer>
            }
            {isOpen &&
                <SignupModalContainer>
                    <SignupModal ref={modalEl}>
                        <div style={{ width: "70%", margin: "0 auto 30px auto", textAlign: "center" }}>
                            <h2 style={{ color: "#189FFB", padding: "0", margin: "0", fontWeight: "800" }}>회원가입</h2>
                        </div>
                        <div style={{ display: "flex", margin: "0 auto", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%" }}>
                            <Input is_width="80%" is_max_width="20rem" is_margin="0 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="아이디" is_outline="none" _onChange={handleIdInput} />
                            <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="비밀번호" type="password" is_outline="none" _onChange={handlePasswordInput} />
                            <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="비밀번호 확인" type="password" is_outline="none" _onChange={handlePasswordConfirmInput} />
                            <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 60px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="닉네임" _onChange={handleNicknameInput} />
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
                    </SignupModal>
                </SignupModalContainer>
            }
            <LoginPageTitle>
                <img src={Logo} alt="로고" style={{ height: "100%", width: "25%" }} />
            </LoginPageTitle>
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
                        is_width="80%"
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

                    <div className="signup_to_box" style={{ width: "14rem", textAlign: "center", display: "flex", justifyContent: "space-between" }}>
                        <Button is_width="60%" is_cursor="pointer" is_size="13px" is_padding="14px 16px" _onClick={handleSignupModal}>회원가입</Button>
                        <Button is_width="60%" is_cursor="pointer" is_size="13px" is_padding="14px 16px" _onClick={() => { alert("다시 가입하세요~!") }}>비밀번호 찾기</Button>
                    </div>
                </LoginPageLoginBox>
            </LoginPageContainer>
        </>
    );
}

const LoginPageTitle = styled.div`
    width: 100%;
    text-align: center;
`

const LoginPageContainer = styled.div`
    display: flex;
    width: 1280px;
    padding: 30px;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
`

const LoginPageLoginBox = styled.div`
    display:flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    width: 340px;
    padding: 20px;
    box-sizing: border-box;
`

const GameExplainContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
`

const GameExplainModal = styled.div`
    position: relative;
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    background: white;
    display: flex;
`


const SignupModalContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
`

const SignupModal = styled.div`
    position: relative;
    transition: 0.3s;
    width: 28%;
    max-width: 25rem;
    height: 561px;
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 14px;
    // 아래에서 위로
    // animation: 400ms ease-in-out 0ms 1 normal forwards running modalIn;
    // 사라락 나타나기
    animation: 0.3s ease us814pn;

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


export default Login;