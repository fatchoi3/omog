import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Logo from '../pictures/omokjomok.svg';

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
import ExplainModal from '../components/Login/ExplainModal';
import PassSearchModal from '../components/Login/PassSearchModal';
import NewPassModal from '../components/Login/NewPassModal';


function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const modalEl = useRef();
    const passModalEl = useRef();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [signupModal, setSignupModal] = useState(false);
    const [explainModal, setExplainModal] = useState(true);
    const [passModal, setPassModal] = useState(false);
    const [newPass, setNewPass] = useState(false);

    const icons = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11];
    const [pickers, setPickers] = useState([]);
    const [pickIndex, setPickIndex] = useState(0);
    const passUserCheck = useSelector(state => state.user.findPassCheck);


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
        if (signupModal === false) {
            setSignupModal(true);
        } else {
            setSignupModal(false);
        }
    }

    const handlePassSearchModal = () => {
        if (passModal === false) {
            setPassModal(true);
        } else {
            setPassModal(false);
        }
    }

    const handleClickOutside = ({ target }) => {
        if (signupModal && (!modalEl.current || !modalEl.current.contains(target))) {
            console.log(modalEl.current.contains(target))
            setSignupModal(false);
        }

        if (passModal && (!passModalEl.current || !passModalEl.current.contains(target))) {
            console.log(passModalEl.current.contains(target))
            setPassModal(false);
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
        if (sessionStorage.getItem("token")) {
            alert("로그인 하셨습니다. 로비 페이지로 이동합니다.")
            history.push('/main')
        }
    }, [])

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [signupModal]);

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [passModal]);


    return (
        <LoginPageContainer>
            <ExplainModal visible={explainModal} handleExplainModal={handleExplainModal} />
            <SignupModal visible={signupModal} handleSignupModal={handleSignupModal} setModalVisible={setSignupModal} ref={modalEl} />
            <PassSearchModal visible={passModal} setPassModal={setPassModal} setNewPass={setNewPass} ref={passModalEl} />

            {passUserCheck &&
                <NewPassModal setNewPass={setNewPass} />
            }

            <LogoBox>
                <img src={Logo} alt="로고" />
            </LogoBox>
            <LoginInputContainer>
                <div>
                    <div>
                        <input type="text" autoComplete="on" placeholder="아이디" onChange={handleIdInput} />
                        <input
                            autoComplete="on"
                            placeholder="비밀번호"
                            type="password"
                            onChange={handlePasswordInput}
                        />
                        <button onClick={handleLogin}>
                            로그인
                        </button>
                    </div>
                    <div className="signup_box">
                        <p onClick={handleSignupModal}>회원가입 하러가기</p>
                        <p onClick={handlePassSearchModal}>비밀번호 찾기</p>
                    </div>
                </div>
            </LoginInputContainer>
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    row-gap: 100px;
`


const LoginInputContainer = styled.div`
    box-sizing: border-box;
    width: 100vw;

    > div {
        display:flex;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        flex-direction: column;
        box-sizing: border-box;
        row-gap: 20px;

        > div:nth-child(1){
            display: flex;
            flex-direction: column;
            width: 30vmax;
            margin: 0 auto;
            text-align: center;
            row-gap: 30px;

                @media only screen and (max-width: 600px) {
                    width: 30vmax;
                }

                @media only screen and (min-width: 600px) {
                    width: 30vmax;
                }
                
                @media only screen and (min-width: 1280px) {
                    width: 20vmax;
                }

                > input {
                    padding: 3px;
                    border:none;
                    border-bottom: 2px solid black;
                    outline: none;

                    &::placeholder {
                        color: #B1B1B1;
                    }

                    @media only screen and (max-width: 600px) {
                        font-size: 3vmax;
                        line-height: 3.2vmax;
                    }

                    @media only screen and (min-width: 600px) {
                        font-size: 2.5vmax;
                        line-height: 2.7vmax;
                    }

                    @media only screen and (min-width: 992px) {
                        font-size: 1.8vmax;
                        line-height: 2vmax;
                    }

                    @media only screen and (min-width: 1280px) {
                        font-size: 1.5vmax;
                        line-height: 1.7vmax;
                    }
                }

            > button {
                padding: 14px 0;
                font-weight: 400;
                border-radius: 14px;
                background-color: #94D7BB;
                cursor: pointer;

                @media only screen and (max-width: 600px) {
                    font-size: 3.2vmax;
                    line-height: 3.4vmax;
                }

                @media only screen and (min-width: 600px) {
                    font-size: 2.7vmax;
                    line-height: 2.9vmax;
                }

                @media only screen and (min-width: 992px) {
                    font-size: 2vmax;
                    line-height: 2.2vmax;
                }
                
                @media only screen and (min-width: 1280px) {
                    font-size: 1.7vmax;
                    line-height: 1.9vmax;
                }
            }
        }

        > div:nth-child(2){
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            row-gap: 20px;

            > p {
                margin: 0;
                color: #616161;
                cursor: pointer;

                @media only screen and (max-width: 600px) {
                    font-size: 2.7vmax;
                    line-height: 2.9vmax;
                }

                @media only screen and (min-width: 600px) {
                    font-size: 2.2vmax;
                    line-height: 2.4vmax;
                }

                @media only screen and (min-width: 992px) {
                    font-size: 1.7vmax;
                    line-height: 1.9vmax;
                }

                @media only screen and (min-width: 1280px) {
                    font-size: 1.2vmax;
                    line-height: 1.4vmax;
                }
            }
        }
    }
`

const LogoBox = styled.div`
    position:absolute;
    top:0%;
    left:50%;
    transform:translate(-50%,10%);

    >img {
        height: auto;

        @media only screen and (max-width: 600px) {
            width: 30vmax;
        }

        @media only screen and (min-width: 600px) {
            width: 30vmax;
        }

        @media only screen and (min-width: 992px) {
            width: 23vmax;
        }

        @media only screen and (min-width: 1280px) {
            width: 15vmax;
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