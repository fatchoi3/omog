import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '../../elements/Text';
import Button from '../../elements/Button';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../../redux/modules/room';


function WaitObserverList({ socket, blackObserverList, whiteObserverList }) {
    console.log(blackObserverList, whiteObserverList)
    console.log("옵져버 컴포넌트입니다 몇 번 렌더링될까요?");

    const dispatch = useDispatch();
    const waitingPerson = useSelector((state) => state.room.userInfo);
    const [rightClicked, setRightClicked] = useState(false);
    const [leftClicked, setLeftClicked] = useState(false);
    const [styled, setStyled] = useState({ display: 'none' });


    // a) emit(”changeToPlayer”, previousTeam, wantTeam)
    // b) emit(”changeToObserver”, previousTeam, wantTeam)

    const ChangeToPlayer = (e) => {
        e.preventDefault();
        console.log("여기입니다.", waitingPerson)
        socket.emit("changeToPlayer", waitingPerson.state, "")
        console.log("플레이어로 변경");
        dispatch(roomActions.changeToPlayer(waitingPerson))
    }

    const ChangeToBlackObserver = (e) => {
        e.preventDefault();
        socket.emit("changeToObserver", waitingPerson.state, "blackObserver")
        console.log("blackObserver로 변경");
        if (leftClicked === false) {
            setLeftClicked(true)
            setRightClicked(false)
        } else {
            setLeftClicked(false)
        }
    };

    const ChangeToWhiteObserver = (e) => {
        e.preventDefault();
        // socket.emit("changeToObserver", waitingPerson.state, "whiteObserver")
        console.log("whiteObserver로 변경");
        if (rightClicked === false) {
            setRightClicked(true)
            setLeftClicked(false)
        } else {
            setRightClicked(false)
        }
    };

    function MouseOver(e) {
        console.log("ok?")
        // e.target.style.display = "none";
    }


    useEffect(() => {
        if (waitingPerson.state === "blackObserver") {
            setLeftClicked(true)
        } else if (waitingPerson.state === "whiteObserver") {
            setRightClicked(true)
        }

        const changeState = (id, userInfos) => {
            console.log("됩니까?", id, userInfos)
        }

        socket.on("changeComplete", changeState)

        return () => {
            socket.off("changeComplete", changeState);
        }
    }, [])


    return (
        <ObserverContainer>
            <div className="black-observer-box" style={{ width: "367px", height: "273px", dislay: "flex" }}>
                <ObserverCard>
                    <ObserverInnerBox>
                        <Text is_bold="800">흑팀 관전자</Text>
                    </ObserverInnerBox>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {blackObserverList &&
                            blackObserverList.map((observer, idx) => (
                                <Text key={idx} is_color="white">{observer}</Text>
                            ))
                        }
                    </div>
                </ObserverCard>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    {leftClicked
                        ?
                        <Button
                            is_width="40%"
                            is_padding="15px 30px"
                            is_radius="14px"
                            is_background="#94D7BB"
                            is_center="center"
                            is_margin="20px"
                            is_border="none"
                            is_cursor="pointer"
                            _onClick={ChangeToBlackObserver}
                        >
                            <Text is_bold="800" is_size="20px" is_line_height="24px">선택</Text>
                        </Button>
                        :
                        <Button
                            is_width="40%"
                            is_padding="13px 28px"
                            is_radius="14px"
                            is_center="center"
                            is_margin="20px"
                            is_box_sizing="border-box"
                            is_cursor="pointer"
                            is_hover="inset -10em 0 0 0 #94D7BB, inset 10em 0 0 0 #94D7BB"
                            _onClick={ChangeToBlackObserver}
                        >
                            <Text is_bold="800" is_size="20px" is_line_height="24px">선택</Text>
                        </Button>
                    }
                </div>
            </div>

            <div className="white-observer-box" style={{ textAlign: "center" }}>
                <ObserverCard>
                    <ObserverInnerBox>
                        <Text is_bold="800">백팀 관전자</Text>
                    </ObserverInnerBox>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {whiteObserverList &&
                            whiteObserverList.map((observer, idx) => (
                                <Text is_line_height="17px" key={idx}>{observer}</Text>
                            ))
                        }
                    </div>
                </ObserverCard>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", boxSizing: "border-box" }}>
                    {rightClicked
                        ?
                        <Button
                            is_width="40%"
                            is_padding="15px 30px"
                            is_radius="14px"
                            is_background="#94D7BB"
                            is_center="center"
                            is_margin="20px"
                            is_border="none"
                            is_cursor="pointer"
                            _onClick={ChangeToWhiteObserver}
                        >
                            <Text is_bold="800" is_size="20px" is_line_height="24px">선택</Text>
                        </Button>
                        :
                        <Button
                            is_width="40%"
                            is_padding="13px 28px"
                            is_radius="14px"
                            is_center="center"
                            is_margin="20px"
                            is_box_sizing="border-box"
                            is_cursor="pointer"
                            is_hover="inset -10em 0 0 0 #94D7BB, inset 10em 0 0 0 #94D7BB"
                            _onClick={ChangeToWhiteObserver}
                        >
                            <Text is_bold="800" is_size="20px" is_line_height="24px">선택</Text>
                        </Button>
                    }
                </div>
            </div>
        </ObserverContainer>
    );
}


const ObserverContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const ObserverCard = styled.div`
    width: 367px;
    height: 100%;
    box-shadow: -3px 3px 6px 3px #A8937340;
    border-radius: 14px;
    display: flex;
`

const ObserverInnerBox = styled.div`
    width: 100%;
    color: #19B775;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #D1D1D1
`
export default React.memo(WaitObserverList);