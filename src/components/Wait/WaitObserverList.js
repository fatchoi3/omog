import React from 'react';
import styled from 'styled-components';
import Text from '../../elements/Text';
import Button from '../../elements/Button';


function WaitObserverList({ blackObserverList, whiteObserverList }) {
    console.log(blackObserverList, whiteObserverList)
    console.log("옵져버 컴포넌트입니다 몇 번 렌더링될까요?");
    return (
        <ObserverContainer>
            <div className="black-observer-box" style={{ textAlign: "center", backgroundColor: "black" }}>
                <ObserverCard>
                    {blackObserverList &&
                        blackObserverList.map((observer, idx) => (
                            <Text key={idx} is_color="white">{observer}</Text>
                        ))
                    }
                </ObserverCard>
                <Button is_width="10px" is_border="1px solid pink">버튼</Button>
            </div>

            <div className="white-observer-box" style={{ textAlign: "center" }}>
                <ObserverCard>
                    {whiteObserverList &&
                        whiteObserverList.map((observer, idx) => (
                            <Text key={idx}>{observer}</Text>
                        ))
                    }
                </ObserverCard>
                <Button is_width="10px" is_border="1px solid pink">버튼</Button>
            </div>
        </ObserverContainer>
    );
}


const ObserverContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const ObserverCard = styled.div`
    width: 200px;
    height: 100%;
    border: 1px solid blue;
`

export default React.memo(WaitObserverList);