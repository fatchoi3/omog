import React from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '../elements/Button';
import Text from '../elements/Text';
import Input from '../elements/Input';
import LoginPageSlider from '../components/LoginPageSlider';


function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [signup, setSignup] = React.useState(false);


    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handleNicknameInput = (e) => {
        setNickname(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmInput = (e) => {
        setPasswordConfirm(e.target.value);
    }

    const emailCheck = (id) => {
        let _reg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+){2,3}$/;

        return _reg.test(id);
    }

    const pwdCheck = (password) => {
        let _reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        return _reg.test(password);
    }

    const handleSignup = () => {
        if (!emailCheck(id)) {
            alert('이메일이 형식에 맞지 않습니다!');
            return;
        }

        if (!pwdCheck(password)) {
            alert('비밀번호가 형식에 맞지 않습니다!');
            return;
        }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다!');
            return;
        }

        if (id === '' || password === '' || nickname === '' || passwordConfirm === '') {
            alert('입력하지 않은 칸이 있습니다!');
            return;
        }

        // dispatch(userActions.signupDB(id, password, passwordConfirm, nickname)).then(
        //     (res) => {
        //         if(res === 'OK'){
        //             setSignup(false);
        //         }
        //     }
        // )
    }

    const handleLogin = () => {
        if (id === '' || password === '') {
            alert('입력하지 않은 칸이 있습니다!');
            return;
        }
        // dispatch(userActions.loginDB(id, password)).then(
        //     (res) => {
        //         if (res === 'ok') {
        //             alert('로그인 되었습니다!');
        //             props.close();
        //         }
        //     }
        // )
    }



    return (
        <>

            <LoginPageTitle>타이틀 혹은 로고가 위치합니다.</LoginPageTitle>
            <LoginPageContainer>
                <LoginPageSlider />

                <LoginPageLoginBox>
                    <Text is_size="26px">로그인</Text>
                    <Input is_border="none" placeholder="아이디" is_padding="3px" is_margin="4px" is_border_bottom="1px solid black"></Input>
                    <Input is_border="none" placeholder="비밀번호" is_padding="3px" is_margin="4px" is_border_bottom="1px solid black"></Input>
                    <Button>로그인</Button>
                    <div className="signup_to_box" style={{ textAlign: "center" }}>새로 가입하시겠습니까? 회원가입</div>
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
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    border: 1px solid red;
`

const LoginPageLoginBox = styled.div`

`



export default Login;