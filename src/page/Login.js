import React from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Button from '../elements/Button';
import Text from '../elements/Text';
import Input from '../elements/Input';
import LoginPageSlider from '../components/LoginPageSlider';


function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const modalEl = React.useRef();

    const [id, setId] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [explainModal, setExplainModal] = React.useState(true);


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


    React.useEffect(() => {
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
                            <Button is_width="30%" is_margin="100px 0 0 0" is_height="30px" _onClick={handleExplainModal}>닫기</Button>
                        </div>
                    </GameExplainModal>
                </GameExplainContainer>
            }
            {isOpen &&
                <SignupModalContainer>
                    <SignupModal ref={modalEl}>
                        <div style={{ width: "70%", margin: "0 auto 30px auto" }}>
                            <h2 style={{ color: "#189FFB", padding: "0", margin: "0" }}>회원가입</h2>
                            <div style={{ width: "100%", bottom: "0px", height: "2px", background: "#189FFB" }}></div>
                        </div>
                        <div style={{ display: "flex", margin: "0 auto", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%" }}>

                            <div style={{ width: "70%", margin: "0 0 10px 0" }}>
                                <Text is_center="left" is_width="100%">아이디</Text>
                                <Input is_width="100%" is_padding="0 5px" is_height="30px" placeholder="아이디를 입력해주세요." _onChange={handleIdInput} />
                            </div>
                            <div style={{ width: "70%", margin: "0 0 10px 0" }}>
                                <Text is_center="left" is_width="100%">닉네임</Text>
                                <Input is_width="100%" is_padding="0 5px" is_height="30px" placeholder="2자 이상 20자 이하" _onChange={handleNicknameInput} />
                            </div>
                            <div style={{ width: "70%", margin: "0 0 10px 0" }}>
                                <Text is_center="left" is_width="100%">비밀번호</Text>
                                <Input is_width="100%" is_padding="0 5px" is_height="30px" placeholder="영문 숫자 특수문자 조합 6-16자리" type="password" _onChange={handlePasswordInput} />
                            </div>
                            <div style={{ width: "70%", margin: "0 0 10px 0" }}>
                                <Text is_center="left" is_width="100%">비밀번호 확인</Text>
                                <Input is_width="100%" is_padding="0 5px" is_height="30px" placeholder="비밀번호를 다시 입력해주세요." type="password" _onChange={handlePasswordConfirmInput} />
                            </div>


                            <Button is_width="30%" is_margin="10px 0 0 0" is_height="30px" _onClick={handleSignup}>회원가입</Button>
                        </div>
                    </SignupModal>
                </SignupModalContainer>
            }
            <LoginPageTitle>타이틀 혹은 로고가 위치합니다.</LoginPageTitle>
            <LoginPageContainer>
                <LoginPageLoginBox>
                    <Text is_size="26px">로그인</Text>
                    <div className="input_box"
                        style={{
                            width: "70%",
                            margin: "30px 0",
                        }}
                    >
                        <Input
                            is_border="none"
                            placeholder="아이디"
                            is_padding="3px"
                            is_margin="10px"
                            is_border_bottom="1px solid black"
                            _onChange={handleIdInput}
                        />
                        <Input
                            autoComplete="on"
                            is_border="none"
                            placeholder="비밀번호"
                            is_padding="3px"
                            is_margin="10px"
                            is_border_bottom="1px solid black"
                            type="password"
                            _onChange={handlePasswordInput}
                        />
                    </div>

                    <Button
                        _onClick={handleLogin}
                        is_margin="5px 0 30px 0"
                        is_padding="5px"
                        is_cursor
                        is_weight="600"
                    >
                        로그인
                    </Button>

                    <div className="signup_to_box" style={{ textAlign: "center" }}>
                        새로 가입하시겠습니까?
                        &nbsp;
                        <span
                            onClick={handleSignupModal}
                            style={{ cursor: "pointer", fontWeight: "600" }}
                        >
                            회원가입
                        </span>
                    </div>
                    <div className="password_search_box" style={{ textAlign: "center" }}>비밀번호 찾기</div>
                </LoginPageLoginBox>
            </LoginPageContainer>
        </>
    );
}

const LoginPageTitle = styled.h1`
    text-align: center;
    border: 1px solid blue;
`

const LoginPageContainer = styled.div`
    display: flex;
    width: 1280px;
    padding: 30px;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    border: 1px solid red;
    box-sizing: border-box;
`

const LoginPageLoginBox = styled.div`
    width: 340px;
    // height: 100%;
    padding: 20px;
    border: 1px solid blue;
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
    width: 600px;
    height: 600px;
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
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