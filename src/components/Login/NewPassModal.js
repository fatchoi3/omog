import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';

import { actionCreators as userActions } from '../../redux/modules/user';


const NewPassModal = (({ setNewPass }) => {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleId = (e) => {
        setId(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePass = (e) => {
        setPass(e.target.value);
    }

    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value);
    }

    const closeModal = () => {
        dispatch(userActions.findPassCheck(false));
    }

    const newPassUpdate = (e) => {
        e.preventDefault();
        if (id === "" || email === "" || pass === "" || confirmPass === "") {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '입력하지 않은 칸이 있습니다.',
            });
            return;
        }

        if (pass !== confirmPass) {
            Swal.fire({
                icon: 'warning',
                title: '비밀번호 일치 오류',
                text: '비밀번호가 일치하지 않습니다.',
            });
            return;
        }

        dispatch(userActions.newPasswordDB(id, email, pass))
    }


    return (
        <PassSeachOverlay>
            <div className="search__box" tabIndex="-1">
                <div onClick={closeModal}>
                    <span>&#10005;</span>
                </div>
                <div className="signup_modal_title_box">
                    <h2>비밀번호 변경</h2>
                </div>

                <form>
                    <input type="text" placeholder="아이디 확인" onChange={handleId} />
                    <input type="email" placeholder="이메일 확인" onChange={handleEmail} />
                    <input type="password" placeholder="새 비밀번호" onChange={handlePass} />
                    <input type="password" placeholder="새 비밀번호 확인하기" onChange={handleConfirmPass} />
                    <button onClick={newPassUpdate}>변경하기</button>
                </form>
            </div>
        </PassSeachOverlay>
    );
});


const PassSeachOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: block;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    box-sizing: border-box;
    overflow: auto;

    > div {
        position :relative;
        top: 50%;
        transform: translateY(-50%);
        width: 20rem;
        height: auto;
        margin: 0 auto;
        padding: 1.5rem;
        border: 2px solid #000;
        border-radius: 14px;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


        > div:nth-child(1) {
            display:flex;
            justify-content: flex-end;

            > span {
                font-size: 18px;
                font-weight: 800;
                cursor: pointer;
            }
        }

        > div:nth-child(2) {
            width: 100%;
            margin: 0 auto 30px auto;
            text-align: center;

            > h2 {
                color: #189FFB;
                padding: 0;
                margin: 0;
                font-weight: 800;
            }
        }

        > form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 0 0;
            width: 100%;
            row-gap: 20px;

            >input {
                width: 80%;
                border: none;
                border-bottom: 1px solid #000;
                outline: none;
                font-size: 14px;
                line-height: 16.8px;
            }

            >button {
                width: 10rem;
                margin: 10px 0 0 0;
                padding: 14px 0;
                font-size: 18px;
                font-weight: 400;
                line-height: 21.6px;
                border-radius: 14px;
                background-color: #94D7BB;
                cursor: pointer;
            }
        }
    }
`

export default NewPassModal;