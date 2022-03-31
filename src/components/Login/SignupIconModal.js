import React from 'react';
import styled from 'styled-components';

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

function SignupIconModal({ handleIconSelect }) {
    const icons = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11];

    return (
        <IconModalContainer>
            <IconListBox>
                {icons.map((i, idx) => {
                    return <img key={idx} src={i} alt="아이콘 선택하기" className={`icon_list_${idx}`} onClick={handleIconSelect} />
                })}
            </IconListBox>
        </IconModalContainer>
    );
}

const IconModalContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px solid #000000;
    border-radius: 14px;
    background: #94D7BB;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 17px 0;
    height: 10rem;

    @media only screen and (max-width: 600px) {
        position: static;
        width: 100%;
        margin: 20px 0;
    }

    @media only screen and (min-width: 600px) {
        position: static;
        width: 100%;
        margin: 20px 0;
    }

    @media only screen and (min-width: 1200px){
        position: absolute;
        left: 23rem;
        top: 14rem;
        width: 20rem;
        margin: 0;
    }
`


const IconListBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > img {
        width: 40px;
        height: 40px;
        margin: 5px;
        cursor: pointer;

        &:hover {
            outline: 2px solid blue;
        }
    }
    

`

export default SignupIconModal;