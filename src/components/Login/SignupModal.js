import React, { useState, forwardRef, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { actionCreators as userActions } from '../../redux/modules/user';

import Button from '../../elements/Button';
import Input from '../../elements/Input';

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
import SignupIconModal from './SignupIconModal';

const SignupModal = forwardRef(({ handleSignupModal }, modalEl) => {
    const icons = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11];

    const dispatch = useDispatch();
    const slideRef = useRef(null);

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // const [pickers, setPickers] = useState([]);
    const [pickIndex, setPickIndex] = useState(0);
    // const [iconIndex, setIconIndex] = useState(0);
    const [iconModal, setIconModal] = useState(false);



    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmInput = (e) => {
        setPasswordConfirm(e.target.value);
    }


    const handleIconModal = () => {
        if (iconModal === false) {
            setIconModal(true);
        } else {
            setIconModal(false);
        }
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
                handleSignupModal(false)
            })
    }

    const handleIconSelect = (e) => {
        setPickIndex(Number(e.target.className.slice(10)))
    }



    return (
        <SignupModalContainer signup="true">
            <div className="signup_modal_box" ref={modalEl}>
                <div className="signup_modal_title_box">
                    <h2>회원가입</h2>
                </div>
                <div className="signup_modal_input_box" style={{ position: "relative" }}>

                    <Input is_width="80%" is_max_width="20rem" is_margin="0 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="아이디 : 2자 이상 8자 미만, 영문 혹은 영문+숫자" is_outline="none" _onChange={handleIdInput} />
                    <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="비밀번호" type="password" is_outline="none" _onChange={handlePasswordInput} />
                    <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 40px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="비밀번호 확인" type="password" is_outline="none" _onChange={handlePasswordConfirmInput} />
                    <div style={{ width: "80%", display: "flex", justifyContent: "space-around" }}>
                        <span>프로필 사진</span>
                        <button onClick={handleIconModal}>변경</button>
                    </div>
                    <div className="SliderContainer" style={{ width: "100%", height: "auto", marginBottom: "10px" }}>
                        <Container>
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
                                />

                            </div>
                        </Container>
                        {iconModal &&
                            <SignupIconModal handleIconSelect={handleIconSelect} />
                        }
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
            </div>
        </SignupModalContainer>
    );
});


const SignupModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;

    > div {
        background: #fff;
        width: 20rem;
        height: auto;
        padding: 1.5rem;
        border: 2px solid #000;
        border-radius: 14px;

        > div:nth-child(1) {
            width: 70%;
            margin: 0 auto 30px auto;
            text-align: center;

            > h2 {
                color: #189FFB;
                padding: 0;
                margin: 0;
                font-weight: 800;
            }
        }

        > div:nth-child(2) {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            justify-content: center;
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

export default SignupModal;