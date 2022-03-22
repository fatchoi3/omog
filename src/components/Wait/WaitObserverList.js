import React from 'react';
import styled from 'styled-components';
import Text from '../../elements/Text';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../../redux/modules/room';

function WaitObserverList({ roomNum, socket }) {
    const dispatch = useDispatch();
    console.log("옵져버 컴포넌트입니다 몇 번 렌더링될까요?");
    const userId = localStorage.getItem("userId")
    const waitingPerson = useSelector((state) => state.room.userInfo);

    const blackObserverList = useSelector(state => state.room.blackObserverList);
    const whiteObserverList = useSelector(state => state.room.whiteObserverList);

    console.log(blackObserverList, whiteObserverList)
    const ChangeToBlackObserver = (e) => {
        e.preventDefault();
        if (userId === waitingPerson.id) {
            console.log(userId, waitingPerson.id)
            dispatch(roomActions.changeUserInfo(userId, waitingPerson.id, "blackObserver"))
            socket.emit("changeToObserver", roomNum, waitingPerson.state, "blackObserver")
        }
        console.log(waitingPerson.state, "blackObserver로 변경");
    };

    const ChangeToWhiteObserver = (e) => {
        e.preventDefault();
        if (userId === waitingPerson.id) {
            console.log(userId, waitingPerson.id)
            dispatch(roomActions.changeUserInfo(userId, waitingPerson.id, "whiteObserver"))
            socket.emit("changeToObserver", roomNum, waitingPerson.state, "whiteObserver")
        }
        console.log(waitingPerson.state, "whiteObserver로 변경");
    };


    return (
        <ObserverContainer>
            {blackObserverList &&
                blackObserverList.includes(userId)
                ?
                <div className="black-observer-box" style={{ width: "367px", height: "273px", dislay: "flex" }}>
                    <ObserverCard leftObserver>
                        <ObserverCardInnerBox>
                            <Text is_bold="800">흑팀 관전자</Text>
                        </ObserverCardInnerBox>
                        <ObserverListBox>
                            {blackObserverList &&
                                blackObserverList.map((observer, idx) => (
                                    <Text key={idx} is_line_height="17px" is_margin="0.3rem">{observer}</Text>
                                ))
                            }
                        </ObserverListBox>
                    </ObserverCard>
                </div>
                :
                <div className="black-observer-box" style={{ width: "367px", height: "273px", dislay: "flex" }} onClick={ChangeToBlackObserver}>
                    <ObserverCard leftObserver>
                        <ObserverCardInnerBox>
                            <Text is_bold="800">흑팀 관전자</Text>
                        </ObserverCardInnerBox>
                        <ObserverListBox>
                            {blackObserverList &&
                                blackObserverList.map((observer, idx) => (
                                    <Text key={idx} is_line_height="17px" is_margin="0.3rem">{observer}</Text>
                                ))
                            }
                        </ObserverListBox>
                    </ObserverCard>
                </div>
            }

            {whiteObserverList &&
                whiteObserverList.includes(userId)
                ?
                <div className="white-observer-box" style={{ textAlign: "center" }}>
                    <ObserverCard>
                        <ObserverCardInnerBox>
                            <Text is_bold="800">백팀 관전자</Text>
                        </ObserverCardInnerBox>
                        <ObserverListBox>
                            {whiteObserverList &&
                                whiteObserverList.map((observer, idx) => (
                                    <Text key={idx} is_line_height="17px" is_margin="0.3rem">{observer}</Text>
                                ))
                            }
                        </ObserverListBox>
                    </ObserverCard>
                </div>
                :
                <div className="white-observer-box" style={{ textAlign: "center" }} onClick={ChangeToWhiteObserver}>
                    <ObserverCard>
                        <ObserverCardInnerBox>
                            <Text is_bold="800">백팀 관전자</Text>
                        </ObserverCardInnerBox>
                        <ObserverListBox>
                            {whiteObserverList &&
                                whiteObserverList.map((observer, idx) => (
                                    <Text key={idx} is_line_height="17px" is_margin="0.3rem">{observer}</Text>
                                ))
                            }
                        </ObserverListBox>
                    </ObserverCard>
                </div>
            }
        </ObserverContainer>
    );
}


const ObserverContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const ObserverListBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ObserverCard = styled.div`
    width: 367px;
    height: 24vh;
    margin: ${props => props.leftObserver ? "0 9px 0 0" : "0 0 0 9px"};
    box-shadow: -3px 3px 6px 3px #A8937340;
    border-radius: 14px;
    display: flex;
    box-sizing: border-box;
    border: 2px solid black;
    background: white;

    &:hover {
        outline: 4px solid #94D7BB;
    }
`

const ObserverCardInnerBox = styled.div`
    width: 100%;
    color: #19B775;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #D1D1D1
`

export default React.memo(WaitObserverList);