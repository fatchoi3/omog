import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { actionCreators as userActions } from '../../redux/modules/user';
import SignupIconSlider from './SignupIconSlider';

import Button from '../../elements/Button';
import Input from '../../elements/Input';


const SignupModal = forwardRef((ref) => {
    console.log(ref)
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmInput = (e) => {
        setPasswordConfirm(e.target.value);
    }

    const pwdCheck = (password) => {
        // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
        let _reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        return _reg.test(password);
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

        dispatch(userActions.signupDB(id, password, passwordConfirm))
    }


    return (
        <SignupModalBox ref={ref}>
            <div style={{ width: "70%", margin: "0 auto 30px auto", textAlign: "center" }}>
                <h2 style={{ color: "#189FFB", padding: "0", margin: "0", fontWeight: "800" }}>회원가입</h2>
            </div>
            <div style={{ display: "flex", margin: "0 auto", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <Input is_width="80%" is_max_width="20rem" is_margin="0 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="아이디" is_outline="none" _onChange={handleIdInput} />
                <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 20px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="비밀번호" type="password" is_outline="none" _onChange={handlePasswordInput} />
                <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 60px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="비밀번호 확인" type="password" is_outline="none" _onChange={handlePasswordConfirmInput} />
                {/* <Input is_width="80%" is_max_width="20rem" is_margin="20px 0 60px 0" is_padding="0 5px" is_height="30px" is_border="none" is_border_bottom="1px solid black" placeholder="닉네임" _onChange={handleNicknameInput} /> */}
                <SignupIconSlider />

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
        </SignupModalBox>
    );
});


const SignupModalBox = styled.div`
    position: relative;
    transition: 0.3s;
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    background: white;
    display: flex;
    width: 28%;
    min-width: 330px;
    height: 561px;
    flex-direction: column;
    justify-content: center;
    border-radius: 14px;
    max-width: 25rem;

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

export default SignupModal;