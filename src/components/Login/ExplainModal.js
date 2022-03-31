import React from 'react';
import styled from 'styled-components';

import ExplainSlider from './ExplainSlider';

function ExplainModal({ handleExplainModal }) {
    return (
        <ExplainContainer>
            <div className="explain__wrap">
                <div className="explain__wrap__modal">
                    <ExplainSlider handleExplainModal={handleExplainModal} />
                </div>
            </div>
        </ExplainContainer>
    );
}

const ExplainContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;

    > div {
        display: flex;
        background: white;
        width: 100%;
        height: 100vh;
        box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;

        > div {
            display: flex;
            width: 100%;
            height: auto;
            margin: 0 auto;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    >div {
        >div{
            width: 60rem;
        }
    }
}
`

export default ExplainModal;