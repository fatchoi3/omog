import React from 'react';
import styled from 'styled-components';
import Text from '../elements/Text';
import Button from '../elements/Button';

import { useSelector, useDispatch } from 'react-redux';


function WaitObserverList(props) {
    const blackObserverList = useSelector((state) => state.room.blackObserverList);
    const whiteObserverList = useSelector((state) => state.room.whiteObserverList);


    return (
        <ObserverContainer>
            <div className="black-observer-box" style={{ textAlign: "center", backgroundColor: "black" }}>
                <ObserverCard>
                    {blackObserverList &&
                        blackObserverList.map((observer, idx) => (
                            <Text key={idx} is_color="white">{observer.id}</Text>
                        ))
                    }
                </ObserverCard>
                <Button is_width="10px" is_border="1px solid pink">버튼</Button>
            </div>

            <div className="white-observer-box" style={{ textAlign: "center" }}>
                <ObserverCard>
                    {whiteObserverList &&
                        whiteObserverList.map((observer, idx) => (
                            <Text key={idx}>{observer.id}</Text>
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

export default WaitObserverList;