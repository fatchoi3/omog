import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { actionCreators as userActions } from '../../redux/modules/user';


const PassSearchModal = forwardRef(({ visible, setPassModal, setNewPass }, passModalEl) => {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");

    const handleId = (e) => {
        setId(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const passwordSearch = (e) => {
        e.preventDefault();
        if (id === "" || email === "") {
            alert("입력하지 않은 칸이 있습니다.")
            return;
        }

        dispatch(userActions.passwordSearchDB(id, email))
            .then(() => {
                setPassModal(false);
                setNewPass(true);
            })
    }

    return (
        <PassSeachOverlay visible={visible}>
            <div className="search__box" tabIndex="-1" ref={passModalEl}>
                <div className="signup_modal_title_box">
                    <h2>비밀번호 찾기</h2>
                </div>
                <form>
                    <input type="text" placeholder="아이디" onChange={handleId} />
                    <input type="email" placeholder="이메일" onChange={handleEmail} />
                    <button onClick={passwordSearch}>찾기</button>
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
    display: ${props => props.visible ? "block" : "none"};
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

        > div:nth-child(1) {
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

export default PassSearchModal;